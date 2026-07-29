import { formatDistanceToNowStrict, format, parseISO } from "date-fns";

/**
 * Converts an ISO date string (e.g. from Java LocalDateTime)
 * into a relative time like:
 * - 2 minutes ago
 * - 3 hours ago
 * - 5 days ago
 *
 * @param {string} dateString
 * @returns {string}
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return "";

  try {
    return formatDistanceToNowStrict(parseISO(dateString), {
      addSuffix: true,
    });
  } catch {
    return "";
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "No due date";

  try {
    return format(parseISO(dateString), "d MMMM");
  } catch {
    return "";
  }
};
