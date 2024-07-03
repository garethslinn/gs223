type Owner = {
    avatar_url: string;
    html_url: string;
  };
  
  type Repository = {
    id: number;
    full_name: string;
    description: string;
    owner: Owner;
  };
  
  export type RepositoryItemProps = {
    repo: Repository;
  };
  