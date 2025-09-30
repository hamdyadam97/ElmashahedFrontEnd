export let mediaModel = (media) => {
  return {
    id: media.id,
    file: media.file,  // مسار الصورة أو الفيديو
    media_type: media.media_type,  // image | video | other
    vid_thumbnail: media.vid_thumbnail || null,  // اختياري للفيديو
    created_at: media.created_at,
  };
};
