import { type WorkflowStep } from "./steps";

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
}
