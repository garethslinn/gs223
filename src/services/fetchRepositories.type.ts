type Repository = {
    id: number;
    full_name: string;
    description: string;
    owner: { avatar_url: string; html_url: string };
};

export type FetchRepositoriesResponse = {
    items: Repository[];
    total_count: number;
};

