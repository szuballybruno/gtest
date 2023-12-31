WITH
question_version_answer_counts AS 
(
	SELECT 
		qv.id question_version_id, 
		COUNT(av.id) answer_count,
		COALESCE(SUM(ad.is_correct::int), 0) correct_answer_count
	FROM public.question_version qv 

	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id

	GROUP BY
		qv.id,
		qv.video_version_id,
		qv.exam_version_id
),
latest_question_version AS
(
	SELECT 
		qv.question_id,
		MAX(qv.id) question_version_id
	FROM public.question_version qv
	
	GROUP BY qv.question_id
),
questions AS 
(
	SELECT 
		qv.id question_version_id, 
		qd.question_text question_text, 
		qv.video_version_id,
		qv.exam_version_id,
		qvac.answer_count,
		qvac.correct_answer_count,
		qvac.answer_count = 0 issue_answers_missing,
		qvac.correct_answer_count = 0 issue_correct_answers_missing
	FROM latest_question_version lqv
	
	LEFT JOIN public.question_version qv
	ON qv.id = lqv.question_version_id

	LEFT JOIN public.question_data qd
	ON qd.id = qv.question_data_id

	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id
	
	LEFT JOIN question_version_answer_counts qvac
	ON qvac.question_version_id = qv.id
),
issues AS
(
	SELECT 
		civ.video_version_id,
		civ.exam_version_id,
		COUNT(qs.question_version_id) question_count,
		STRING_AGG(qs.question_text || CASE WHEN qs.issue_answers_missing THEN ': ans_miss' ELSE ': corr_ans_miss' END, CHR(10)) 
			FILTER (WHERE qs.issue_answers_missing OR qs.issue_correct_answers_missing) question_issues,
		COALESCE(SUM(qs.issue_answers_missing::int), 0) missing_answers_issues_count,
		COALESCE(SUM(qs.issue_correct_answers_missing::int), 0) missing_correct_answers_count
	FROM public.course_item_view civ

	LEFT JOIN questions qs
	ON qs.video_version_id = civ.video_version_id 
	OR qs.exam_version_id = civ.exam_version_id

	GROUP BY
		civ.video_version_id,
		civ.exam_version_id
),
items AS
(
	SELECT 
		iss.video_version_id,
		iss.exam_version_id,
		iss.question_count,
		iss.question_count = 0 issue_questions_missing,
		iss.question_issues question_issues
	FROM issues iss
	
	ORDER BY
		iss.question_count DESC
)
SELECT 
	lcvv.course_id,
	lcvv.version_id course_version_id,
	civ.module_name,
	civ.module_order_index,
	civ.module_version_id,
	civ.video_version_id,
	civ.exam_version_id,
	civ.item_order_index,
	civ.item_title,
	civ.item_subtitle,
	civ.item_type,
	civ.version_code,
	CONCAT_WS(
		CHR(10), 
		CASE WHEN it.issue_questions_missing THEN 'questions_missing' END, 
		it.question_issues) errors,
	CONCAT_WS(
		CHR(10), 
		CASE WHEN civ.item_type = 'video' AND vd.video_file_length_seconds > 480 
			THEN 'video_too_long' END) warnings,
	vd.video_file_length_seconds video_length,
	vd.audio_text video_audio_text,
	vd.description video_description
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_item_view civ
ON civ.course_version_id = lcvv.version_id

LEFT JOIN items it
ON it.video_version_id = civ.video_version_id 
OR it.exam_version_id = civ.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = it.video_version_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

ORDER BY 
	lcvv.course_id, 
	civ.module_order_index,
	civ.item_order_index
