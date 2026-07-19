export function calculateContribution({ notes, reviews, bookmarks, replies }) {
  const notePoints = notes * 10;

  const reviewPoints = reviews * 2;

  const bookmarkPoints = bookmarks;

  const replyPoints = replies;

  return notePoints + reviewPoints + bookmarkPoints + replyPoints;
}
