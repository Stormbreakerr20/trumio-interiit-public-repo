export interface MilestoneSchema {
  id: string,
  name: string;
  description: string;
  duration: number;
  cost: number;
  deliverables: {
    id: string,
    text: string
  }[];
}
