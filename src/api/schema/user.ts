export interface userInfo {
  id: number;
  name: string;
  shotgridId: number;
  email: string;
  rule: string;
  login: string;
  department: string | null;
  lastAccess: string;
  position: string | null;
  projects: [];
  pmProject: [];
}
