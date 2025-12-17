import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VideoLibraryIndex from './component/VideoLibraryIndex.jsx'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoLibraryIndex />
  </StrictMode>,
)
