import { useEffect, useState } from "react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { ModuleAdminEditDTO } from "../../../shared/dtos/ModuleAdminEditDTO"
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications"
import { LoadingFrame } from "../../system/LoadingFrame"
import { EpistoEntry } from "../../controls/EpistoEntry"
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import { useModuleEditData, useSaveModule } from "../../../services/api/moduleApiService"
import { SelectImage } from "../../universal/SelectImage"
import { Flex, Image } from "@chakra-ui/react";
import { EpistoLabel } from "../../controls/EpistoLabel"
import { useIntParam } from "../../../static/locationHelpers"
import { AdminCourseItemList } from "./AdminCourseItemList"
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader"

// deprecated because DataGrid
export const EditModuleSubpage = () => {

    const [moduleName, setModuleName] = useState("");
    const [moduleDescription, setModuleDescription] = useState("");
    const [moduleImageSource, setMoudleImageSource] = useState<string | null>(null);
    const [moduleImageFile, setMoudleImageFile] = useState<File | null>(null);

    const moduleId = useIntParam("moduleId")!;
    const { moduleEditData } = useModuleEditData(moduleId);
    const { saveModuleAsync } = useSaveModule();
    const showError = useShowErrorDialog();

    const handleSaveModuleAsync = async () => {

        try {

            await saveModuleAsync(
                {
                    id: moduleId,
                    name: moduleName,
                    description: moduleDescription
                } as ModuleAdminEditDTO,
                moduleImageFile ?? undefined);

            showNotification("Modul sikeresen mentve.");
        }
        catch (e) {

            showError(e);
        }
    }

    useEffect(() => {

        if (!moduleEditData)
            return;

        setModuleName(moduleEditData.name);
        setModuleDescription(moduleEditData.description);
        setMoudleImageSource(moduleEditData.imageFilePath);
    }, [moduleEditData]);

    return <LoadingFrame
        direction="column"
        justify="flex-start"
        flex="1">
        <AdminBreadcrumbsHeader subRouteLabel={moduleName} >
            {/* <AdminCourseItemList /> */}

            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.editModuleRoute
                ]}
                onSave={handleSaveModuleAsync}>

                <Flex
                    className="roundBorders"
                    background="var(--transparentWhite70)"
                    mt="5px"
                    p="0 10px 10px 10px"
                    direction="column">

                    <EpistoLabel text="Üdvözlő kép">
                        <SelectImage
                            width="300px"
                            height="200px"
                            setImageSource={setMoudleImageSource}
                            setImageFile={setMoudleImageFile}>
                            <Image
                                className="whall"
                                objectFit="cover"
                                src={moduleImageSource ?? ""} />
                        </SelectImage>
                    </EpistoLabel>

                    <EpistoEntry
                        label="Modul neve"
                        value={moduleName}
                        setValue={setModuleName} />

                    <EpistoEntry
                        label="Modul leírása"
                        value={moduleDescription}
                        setValue={setModuleDescription}
                        isMultiline />
                </Flex>

            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader>

    </LoadingFrame>
}
