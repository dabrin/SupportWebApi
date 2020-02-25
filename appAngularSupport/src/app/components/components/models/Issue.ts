export class Issue {
    Report_Number: number;
    Id_Supporter: number;
    Classification: string;
    Status: string;
    userById: number;
    Report_Time: string;
    Resolution_Comment: string;

    getIdUser(): number {

        return this.userById;
    }
}

