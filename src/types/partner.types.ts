
export interface IPartner {
  _id?:         string;
  name:         string;
  logo?:        string;
  description?: string;
  phone?:       string;
  email?:       string;
  website?:     string;
  isActive:     boolean;
  isDeleted?:   boolean;
  createdBy?:   string | { _id: string; name: string; role?: string };
  createdAt?:   string;
  updatedAt?:   string;
}