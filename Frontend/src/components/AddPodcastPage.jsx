import React from "react";
import { UploadCloud, Rss, Youtube } from "lucide-react";

const AddPodcastPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-700 mb-8">Ques.<span className="text-black">AI</span></h1>
          <nav className="space-y-4">
            <a href="#" className="text-purple-700 font-semibold">+ Add your Podcast(s)</a>
            <a href="#" className="block text-gray-700 hover:text-purple-700">Create & Repurpose</a>
            <a href="#" className="block text-gray-700 hover:text-purple-700">Podcast Widget</a>
            <a href="#" className="block text-gray-700 hover:text-purple-700">Upgrade</a>
          </nav>
        </div>
        <div>
          <button className="text-gray-500 text-sm mb-4">Help</button>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="text-sm font-medium">Username</p>
              <p className="text-xs text-gray-500">username@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="text-sm text-gray-500 mb-2">Home Page / Sample Project / <span className="text-purple-600 font-medium">Add your podcast</span></div>
        <h2 className="text-2xl font-bold mb-6">Add Podcast</h2>

        {/* Podcast Options */}
        <div className="flex gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 flex items-center space-x-4">
            <Rss className="text-orange-500 w-8 h-8" />
            <div>
              <h3 className="font-semibold">RSS Feed</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 flex items-center space-x-4">
            <Youtube className="text-red-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold">Youtube Video</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-md w-1/3 flex items-center space-x-4">
            <UploadCloud className="text-purple-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold">Upload Files</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-10 rounded-lg shadow-md text-center">
          <UploadCloud className="mx-auto text-purple-600 w-12 h-12 mb-4" />
          <p className="text-gray-600 mb-2">Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
          <p className="text-sm text-gray-500 mb-4">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
          <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition">Select File</button>
        </div>
      </main>
    </div>
  );
};

export default AddPodcastPage;
