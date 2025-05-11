import { format, parseISO } from "date-fns";

export const formatDate = (dateInput: string | Date) => {
  try {
    const date =
      typeof dateInput === "string" ? parseISO(dateInput) : new Date(dateInput);
    return format(date, "MMM dd, yyyy");
  } catch {
    return "N/A";
  }
};

export const formatLongDate = (dateInput: string | Date) => {
  try {
    const date =
      typeof dateInput === "string" ? parseISO(dateInput) : new Date(dateInput);
    return format(date, "MMMM yyyy");
  } catch {
    return "N/A";
  }
};
