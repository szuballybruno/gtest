SELECT 
	"user"."id" AS "userId",
	"sf"."filePath",
	"csv"."isComplete",
	"csv"."isStarted",
	
	-- current exam id
	CASE WHEN 
		"exam"."id" IS NULL
			AND "video"."id" IS NULL 
			AND "ciav"."examId" IS NOT NULL
		THEN "ciav"."examId"
		ELSE "exam"."id"
	END AS "currentExamId",
	
	-- current vide id
	CASE WHEN 
		"video"."id" IS NULL
			AND "exam"."id" IS NULL 
			AND "ciav"."videoId" IS NOT NULL
		THEN "ciav"."videoId"
		ELSE "video"."id"
	END AS "currentVideoId",
	"course".*
FROM public."course"

LEFT JOIN public."course_state_view" AS "csv"
ON "csv"."courseId" = "course"."id"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "course"."coverFileId"

LEFT JOIN public."user"
ON "user"."id" = "csv"."userId"

LEFT JOIN public."exam" 
ON "user"."currentExamId" = "exam"."id"
	AND "exam"."courseId" = "course"."id"

LEFT JOIN public."video" 
ON "user"."currentVideoId" = "video"."id"
	AND "video"."courseId" = "course"."id"

LEFT JOIN public."course_item_all_view" AS "ciav"
ON "ciav"."courseId" = "course"."id"
	AND "ciav"."orderIndex" = 0
	

