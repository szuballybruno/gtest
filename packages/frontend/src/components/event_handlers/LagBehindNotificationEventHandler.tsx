import { useEffect } from 'react';
import { LagBehindNotificationDTO } from '@episto/communication';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';

export const LagBehindNotificationEventHandler = (props: {
    data: LagBehindNotificationDTO | null,
    key: any
}) => {

    const { data, key } = props;

    const dialogLogic = useEpistoDialogLogic('lagbehind');

    useEffect(() => {

        if (!data)
            return;

        dialogLogic.openDialog();
    }, [data]);

    return <>
        <EpistoDialog
            closeButtonType="top"
            key={key}
            logic={dialogLogic}>

            {data?.lagBehindPercentage}
        </EpistoDialog>
    </>;
};