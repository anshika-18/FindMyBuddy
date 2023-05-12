import songs from "./csv/data.json";

export default (req, res) => {
  const { songIds } = req.body;
  console.log(songs);
  if (!songIds) {
    return res.status(400).json({ error: "Song IDs are required" });
  }

  const songDetails = songs.filter((s) => songIds.includes(s.index));

  if (!songDetails || songDetails.length === 0) {
    return res.status(404).json({ error: "Songs not found" });
  }

  return res.json(songDetails);
};
