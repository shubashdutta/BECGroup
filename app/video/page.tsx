"use client";
import { VideoGallery } from "@/components/video/VideoGallery";
import { fetchVideos } from "@/lib/api/video";
import { useVideoStore } from "@/store/videoStore";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { VideoFilter } from "@/components/video/VideoFilter";

export default function VideoPage() {
  const { videos, currentVideo, loading } = useVideoStore();
  return <VideoGallery videos={videos} current={currentVideo} />;
}
