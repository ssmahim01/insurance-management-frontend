import divisionsRaw from "@/data/divisions.json";
import districtsRaw from "@/data/districts.json";
import upazilasRaw from "@/data/upazilas.json";

export interface IDivision {
    id: string;
    name: string;
    bn_name: string;
    url?: string;
}

export interface IDistrict {
    id: string;
    division_id: string;
    name: string;
    bn_name: string;
    lat?: string;
    lon?: string;
    url?: string;
}

export interface IUpazila {
    id: string;
    district_id: string;
    name: string;
    bn_name: string;
    url?: string;
}

// The uploaded JSON files are phpMyAdmin exports: an array of objects where
// one entry has type "table" and holds the actual rows in `.data`.
function extractTable<T>(raw: unknown): T[] {
    const arr = raw as any[];
    const table = arr.find((item) => item?.type === "table");
    return (table?.data ?? []) as T[];
}

export const divisions: IDivision[] = extractTable<IDivision>(divisionsRaw);
export const districts: IDistrict[] = extractTable<IDistrict>(districtsRaw);
export const upazilas: IUpazila[] = extractTable<IUpazila>(upazilasRaw);

export const getDivisionById = (id: string) =>
    divisions.find((d) => d.id === id);

export const getDistrictById = (id: string) =>
    districts.find((d) => d.id === id);

export const getUpazilaById = (id: string) =>
    upazilas.find((u) => u.id === id);

export const getDistrictsByDivision = (divisionId: string): IDistrict[] =>
    divisionId ? districts.filter((d) => d.division_id === divisionId) : [];

export const getUpazilasByDistrict = (districtId: string): IUpazila[] =>
    districtId ? upazilas.filter((u) => u.district_id === districtId) : [];