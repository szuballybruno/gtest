import { CompanyEditDataDTO } from '../../shared/dtos/company/CompanyEditDataDTO';
import { CompanyDTO } from '../../shared/dtos/company/CompanyDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';
import { RoleAssignCompanyDTO } from '../../shared/dtos/company/RoleAssignCompanyDTO';
import { Id } from '../../shared/types/versionId';

export const useCompaniesAdmin = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getCompaniesAdmin);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state,
        companiesError: qr.error,
        refetchCompanies: qr.refetch
    };
};

export const useRoleAssignCompanies = () => {

    const qr = QueryService.useXQuery<RoleAssignCompanyDTO[]>(apiRoutes.companies.getRoleAssignCompanies);

    return {
        roleAssignCompanies: qr.data ?? [],
        roleAssignCompaniesState: qr.state,
        roleAssignCompaniesError: qr.error,
        refetchRoleAssignCompanies: qr.refetch
    };
};

export const useCreateCompany = () => {

    const qr = usePostDataUnsafe(apiRoutes.companies.createCompany);

    return {
        createCompanyAsync: qr.postDataAsync,
        createCompanyState: qr.state
    };
};

export const useDeleteCompany = () => {

    const qr = usePostDataUnsafe<{ companyId: number }, void>(apiRoutes.companies.deleteCompany);

    return {
        deleteCompanyAsync: qr.postDataAsync,
        deleteCompanyState: qr.state
    };
};

export const useSaveCompany = () => {

    const qr = usePostDataUnsafe<CompanyEditDataDTO, void>(apiRoutes.companies.saveCompany);

    return {
        saveCompanyAsync: qr.postDataAsync,
        saveCompanyState: qr.state
    };
};

export const useCompanies = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getCompanies);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};

export const useCompanyEditData = (companyId: Id<'Company'>) => {

    const qr = QueryService.useXQuery<CompanyEditDataDTO>(apiRoutes.companies.getCompanyEditData, { companyId });

    return {
        companyEditData: qr.data,
        companyEditDataState: qr.state
    };
};

export const useAvailableCompaniesForRoleCreation = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getAvailableCompaniesForRoleCreation);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};
