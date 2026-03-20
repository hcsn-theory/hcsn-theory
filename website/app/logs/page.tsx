"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileJson, FileText, FolderTree, RefreshCw, X, Download, ExternalLink } from "lucide-react"

import { Card } from "@/components/Card"
import { Badge } from "@/components/Badge"
import { cn } from "@/lib/utils"

// GitHub API types
type GitHubNode = {
  path: string
  mode: string
  type: "blob" | "tree"
  sha: string
  size: number
  url: string
}

export default function LogsPage() {
  const [files, setFiles] = React.useState<GitHubNode[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  const [selectedFile, setSelectedFile] = React.useState<GitHubNode | null>(null)
  const [fileContent, setFileContent] = React.useState<string | null>(null)
  const [contentLoading, setContentLoading] = React.useState(false)

  const fetchFiles = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch repo tree recursively
      const res = await fetch("https://api.github.com/repos/hcsn-theory/hcsn-sim/git/trees/main?recursive=1")
      if (!res.ok) {
        throw new Error("Failed to fetch repository data")
      }
      const data = await res.json()
      
      // Filter for files with .log and .json
      const relevantFiles = data.tree.filter(
        (node: GitHubNode) => 
          node.type === "blob" && 
          (node.path.endsWith(".log") || node.path.endsWith(".json"))
      ).sort((a: GitHubNode, b: GitHubNode) => b.path.localeCompare(a.path)) // Descending to see latest names if timestamped
      
      setFiles(relevantFiles)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching files.")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  // Fetch content when a file is selected
  React.useEffect(() => {
    if (!selectedFile) {
      setFileContent(null)
      return
    }

    const fetchContent = async () => {
      setContentLoading(true)
      try {
        const rawUrl = `https://raw.githubusercontent.com/hcsn-theory/hcsn-sim/main/${selectedFile.path}`
        
        // Handle potentially large files by not fully downloading them if they're massive,
        // but for now we just fetch directly
        const res = await fetch(rawUrl)
        if (!res.ok) throw new Error("Failed to fetch file content")
        
        let text = await res.text()
        
        // Prettify JSON if applicable
        if (selectedFile.path.endsWith('.json')) {
          try {
            const parsed = JSON.parse(text)
            text = JSON.stringify(parsed, null, 2)
          } catch (e) {
            // Ignore if invalid JSON
          }
        }
        
        setFileContent(text)
      } catch (err) {
        setFileContent("Error loading content. It may be too large to load in the browser, or cross-origin headers block it.")
      } finally {
        setContentLoading(false)
      }
    }

    fetchContent()
  }, [selectedFile])

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleDownload = () => {
    if (!selectedFile || !fileContent) return
    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedFile.path.split('/').pop() || 'file'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Simulation Logs</h1>
          <p className="text-muted-foreground text-lg">
            Dynamically generated logs and data exports from the HCSN simulator.
          </p>
        </div>
        <button 
          onClick={fetchFiles}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      <div className="md:hidden mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Logs & Data</h1>
        <p className="text-muted-foreground mb-4">
          Latest outputs from the HCSN simulations.
        </p>
        <button 
          onClick={fetchFiles}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-9 px-3"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
          Refresh List
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        
        {/* Sidebar - File List */}
        <div className="w-full lg:w-1/3 flex flex-col rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <h2 className="font-semibold flex items-center">
              <FolderTree className="h-5 w-5 mr-2 text-primary" />
              Repository Files
            </h2>
            <Badge variant="outline">{files.length}</Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loading && files.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                <RefreshCw className="h-8 w-8 animate-spin mb-4 text-primary/50" />
                Fetching files from GitHub...
              </div>
            ) : error ? (
              <div className="p-4 m-2 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </div>
            ) : files.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No log or json files found in the repository.
              </div>
            ) : (
              files.map((file) => {
                const isSelected = selectedFile?.path === file.path
                const isJson = file.path.endsWith('.json')
                
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={cn(
                      "w-full text-left px-3 py-3 rounded-lg flex items-start space-x-3 transition-all duration-200",
                      isSelected 
                        ? "bg-primary/10 border border-primary/20 shadow-sm" 
                        : "hover:bg-accent/50 border border-transparent"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-md",
                      isJson ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500",
                      isSelected && (isJson ? "bg-amber-500/20" : "bg-blue-500/20")
                    )}>
                      {isJson ? <FileJson className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        isSelected ? "text-foreground" : "text-foreground/80"
                      )}>
                        {file.path.split('/').pop()}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5" title={file.path}>
                        {file.path.split('/').slice(0, -1).join('/') || '/'} • {formatSize(file.size)}
                      </p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Main Content - File Viewer */}
        <div className="w-full lg:w-2/3 flex flex-col rounded-xl border bg-card overflow-hidden shadow-sm relative">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center"
              >
                <div className="w-24 h-24 mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">Select a file to view</h3>
                <p className="max-w-sm">
                  Choose a log or JSON file from the side panel to view its contents directly in the browser.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="viewer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 flex flex-col h-full"
              >
                <div className="p-4 border-b flex items-center justify-between bg-muted/10">
                  <div className="flex items-center min-w-0 pr-4">
                    {selectedFile.path.endsWith('.json') ? (
                      <FileJson className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    )}
                    <h2 className="font-semibold truncate text-sm md:text-base">
                      {selectedFile.path}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <a 
                      href={`https://github.com/hcsn-theory/hcsn-sim/blob/main/${selectedFile.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      title="View on GitHub"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button 
                      onClick={handleDownload}
                      disabled={contentLoading || !fileContent}
                      className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setSelectedFile(null)}
                      className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto bg-zinc-950 p-4 font-mono text-sm relative">
                  {contentLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
                      <RefreshCw className="h-8 w-8 animate-spin text-zinc-400" />
                    </div>
                  ) : null}
                  
                  {fileContent ? (
                    <pre className="text-zinc-300 whitespace-pre-wrap break-words">
                      {fileContent}
                    </pre>
                  ) : (
                    !contentLoading && (
                      <div className="text-zinc-500 flex h-full items-center justify-center">
                        No content available or file is empty.
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
