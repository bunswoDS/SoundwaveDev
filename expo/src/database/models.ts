// Type definitions for database models

export interface Category {
  id?: number;
  name: string;
  image_normal?: string;
  image_hover?: string;
  image_click?: string;
  language: string;
}

export interface Sound {
  id?: number;
  name: string;
  file_path: string;
  answer_text: string;
  answer_audio_path?: string;
  category_id: number;
  language: string;
}

export interface Language {
  id?: number;
  code: string;
  name: string;
}

export interface Settings {
  id?: number;
  max_replays: number | null; // null means infinite
  language: string;
}
