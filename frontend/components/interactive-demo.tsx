"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, CheckCircle2, AlertCircle, XCircle, Plus, X } from "lucide-react"

type DetectionResult = "ai" | "probably-ai" | "not-ai" | null

export default function InteractiveDemo() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [clearResponse, setClearResponse] = useState("")
  const [watermarkedResponse, setWatermarkedResponse] = useState("")
  const [clearImageResponse, setClearImageResponse] = useState<string | null>(null)
  const [watermarkedImageResponse, setWatermarkedImageResponse] = useState<string | null>(null)
  const [isImageMode, setIsImageMode] = useState(false)
  const [checkContent, setCheckContent] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [detectionResult, setDetectionResult] = useState<DetectionResult>(null)
  const [checking, setChecking] = useState(false)
  const [textServerStatus, setTextServerStatus] = useState<"up" | "down" | "checking">("checking")
  const [imageServerStatus, setImageServerStatus] = useState<"up" | "down" | "checking">("checking")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setClearResponse("")
    setWatermarkedResponse("")
    setClearImageResponse(null)
    setWatermarkedImageResponse(null)
    setIsImageMode(false)

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const data = await response.json()
      
      setClearResponse(data.clean || "")
      setWatermarkedResponse(data.watermarked || "")
    } catch (error) {
      console.error("Error generating response:", error)
      setClearResponse("Error: Failed to generate response. Please try again.")
      setWatermarkedResponse("Error: Failed to generate response. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setClearResponse("")
    setWatermarkedResponse("")
    setClearImageResponse(null)
    setWatermarkedImageResponse(null)
    setIsImageMode(true)

    try {
      const response = await fetch("/api/prompt-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const data = await response.json()
      
      // Handle base64 image data from the API response
      if (data.clean_image_base64) {
        const cleanImg = data.clean_image_base64.startsWith("data:") 
          ? data.clean_image_base64 
          : `data:image/png;base64,${data.clean_image_base64}`
        setClearImageResponse(cleanImg)
      }
      
      if (data.watermarked_image_base64) {
        const watermarkedImg = data.watermarked_image_base64.startsWith("data:") 
          ? data.watermarked_image_base64 
          : `data:image/png;base64,${data.watermarked_image_base64}`
        setWatermarkedImageResponse(watermarkedImg)
      }
    } catch (error) {
      console.error("Error generating image response:", error)
      setClearImageResponse(null)
      setWatermarkedImageResponse(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCheck = async () => {
    if (!checkContent.trim() && !uploadedImage) return

    setChecking(true)
    setDetectionResult(null)

    try {
      let response: Response
      let data: any

      // Check if we have an uploaded image
      if (uploadedImage) {
        // Convert data URL to File
        const imageResponse = await fetch(uploadedImage)
        const blob = await imageResponse.blob()
        const file = new File([blob], "image.png", { type: blob.type })

        const formData = new FormData()
        formData.append("file", file)

        response = await fetch("/api/detect-image", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `API error: ${response.status}`)
        }

        data = await response.json()
        
        // Map image detection response: { z_score, is_generated, confidence }
        setDetectionResult(data.is_generated ? "ai" : "not-ai")
      } else {
        // Text detection
        response = await fetch("/api/detect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: checkContent }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `API error: ${response.status}`)
        }

        data = await response.json()
        
        // Map text detection response: { verdict, score, method }
        if (data.verdict.includes("Watermarked")) {
          setDetectionResult("ai")
        } else if (data.verdict === "Clean") {
          setDetectionResult("not-ai")
        } else {
          // Fallback based on score
          setDetectionResult(data.score > 0.60 ? "ai" : "not-ai")
        }
      }
    } catch (error) {
      console.error("Error detecting watermark:", error)
      setDetectionResult(null)
    } finally {
      setChecking(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  const getResultIcon = () => {
    switch (detectionResult) {
      case "ai":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "probably-ai":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "not-ai":
        return <CheckCircle2 className="h-5 w-5 text-accent" />
      default:
        return null
    }
  }

  const getResultText = () => {
    switch (detectionResult) {
      case "ai":
        return "AI Generated"
      case "probably-ai":
        return "Probably AI"
      case "not-ai":
        return "Clear"
      default:
        return ""
    }
  }

  const checkServerHealth = async () => {
    // Check text server health
    try {
      const textResponse = await fetch("/api/health-text")
      const textData = await textResponse.json()
      setTextServerStatus(textData.status === "up" ? "up" : "down")
    } catch (error) {
      console.error("Error checking text server health:", error)
      setTextServerStatus("down")
    }

    // Check image server health
    try {
      const imageResponse = await fetch("/api/health-image")
      const imageData = await imageResponse.json()
      setImageServerStatus(imageData.status === "up" ? "up" : "down")
    } catch (error) {
      console.error("Error checking image server health:", error)
      setImageServerStatus("down")
    }
  }

  useEffect(() => {
    // Check health on mount
    checkServerHealth()

    // Check health every 30 seconds
    const interval = setInterval(checkServerHealth, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="demo" className="py-20 sm:py-28 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            We are hosting our own LLM server wich  a custom watermarking model. You can see the difference beetween a watermarked and a clear response.
          </p>
        </div>

        <Tabs defaultValue="generate" className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Text Server: <span className={textServerStatus === "up" ? "text-green-500 font-medium" : textServerStatus === "down" ? "text-red-500 font-medium" : ""}>
                  {textServerStatus === "checking" ? "Checking..." : textServerStatus === "up" ? "Up" : "Down"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Image Server: <span className={imageServerStatus === "up" ? "text-green-500 font-medium" : imageServerStatus === "down" ? "text-red-500 font-medium" : ""}>
                  {imageServerStatus === "checking" ? "Checking..." : imageServerStatus === "up" ? "Up" : "Down"}
                </span>
              </span>
            </div>
          </div>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="generate" className="text-base">
              Generate & Compare
            </TabsTrigger>
            <TabsTrigger value="detect" className="text-base">
              Detect Watermark
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Enter your prompt</label>
                  <Textarea
                    placeholder="Ask AI to write something..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="w-full sm:w-auto gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate Text Response
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleGenerateImage}
                    disabled={loading || !prompt.trim()}
                    className="w-full sm:w-auto gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate Image Response
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Clear Response</h3>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">No Watermark</span>
                </div>
                <div className="min-h-[200px] text-sm text-muted-foreground leading-relaxed">
                  {loading ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : clearImageResponse ? (
                    <img 
                      src={clearImageResponse} 
                      alt="Clear response" 
                      className="w-full h-auto rounded-md"
                    />
                  ) : clearResponse ? (
                    <p>{clearResponse}</p>
                  ) : (
                    <p className="text-muted-foreground/50">Response will appear here...</p>
                  )}
                </div>
              </Card>

              <Card className="p-6 border-primary/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Watermarked Response</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Watermarked</span>
                </div>
                <div className="min-h-[200px] text-sm text-muted-foreground leading-relaxed">
                  {loading ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : watermarkedImageResponse ? (
                    <img 
                      src={watermarkedImageResponse} 
                      alt="Watermarked response" 
                      className="w-full h-auto rounded-md"
                    />
                  ) : watermarkedResponse ? (
                    <p>{watermarkedResponse}</p>
                  ) : (
                    <p className="text-muted-foreground/50">Response will appear here...</p>
                  )}
                </div>
              </Card>
            </div>

            {clearResponse && (
              <Card className="p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  💡 Both responses look identical, but the watermark is embedded invisibly in the second one
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="detect" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Paste content to check</label>
                  <Textarea
                    placeholder="Paste text, upload image, or audio file..."
                    value={checkContent}
                    onChange={(e) => setCheckContent(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Add Image
                    </label>
                  </div>
                  {uploadedImage && (
                    <div className="relative group">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded preview"
                        className="h-20 w-20 object-cover rounded-md border border-border"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleCheck}
                  disabled={checking || (!checkContent.trim() && !uploadedImage)}
                  className="w-full sm:w-auto gap-2"
                >
                  {checking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Check for Watermark"
                  )}
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Clear Response</h3>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">No Watermark</span>
                </div>
                <div className="min-h-[200px] text-sm text-muted-foreground leading-relaxed">
                  {clearResponse ? (
                    <p>{clearResponse}</p>
                  ) : (
                    <p className="text-muted-foreground/50">Generate content in the other tab first...</p>
                  )}
                </div>
              </Card>

              <Card className="p-6 border-primary/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Watermarked Response</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Watermarked</span>
                </div>
                <div className="min-h-[200px] text-sm text-muted-foreground leading-relaxed">
                  {watermarkedResponse ? (
                    <p>{watermarkedResponse}</p>
                  ) : (
                    <p className="text-muted-foreground/50">Generate content in the other tab first...</p>
                  )}
                </div>
              </Card>
            </div>

            {detectionResult && (
              <Card className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    {getResultIcon()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{getResultText()}</h3>
                    <p className="text-muted-foreground">
                      {detectionResult === "ai" && "This content was generated by AI with our watermark"}
                      {detectionResult === "probably-ai" && "This content likely contains AI-generated elements"}
                      {detectionResult === "not-ai" && "No AI watermark detected in this content"}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
