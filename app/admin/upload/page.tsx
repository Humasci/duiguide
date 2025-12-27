'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface UploadFormData {
  state: string;
  county: string;
  topic: string;
  sourceUrl: string;
}

const STATES = [
  { value: 'Texas', label: 'Texas' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Tennessee', label: 'Tennessee' },
];

const TOPICS = [
  { value: 'impound', label: 'Impound' },
  { value: 'bail', label: 'Bail' },
  { value: 'dmv', label: 'DMV/ALR' },
  { value: 'court', label: 'Court' },
  { value: 'scram', label: 'SCRAM' },
  { value: 'license', label: 'License Reinstatement' },
];

export default function UploadPage() {
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');
  const [formData, setFormData] = useState<UploadFormData>({
    state: '',
    county: '',
    topic: '',
    sourceUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [counties, setCounties] = useState<Array<{ value: string; label: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Fetch counties when state changes
  const handleStateChange = async (state: string) => {
    setFormData({ ...formData, state, county: '' });
    setCounties([]);

    if (!state) return;

    try {
      const supabase = createClient();
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data: stateData } = await supabase
        .from('states')
        .select('id')
        .eq('name', state)
        .single();

      if (!stateData) return;

      const { data: countiesData } = await supabase
        .from('counties')
        .select('name')
        .eq('state_id', stateData.id)
        .eq('is_active', true)
        .order('name');

      if (countiesData) {
        setCounties(
          countiesData.map((c) => ({ value: c.name, label: c.name }))
        );
      }
    } catch (err) {
      console.error('Error fetching counties:', err);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PDF, DOCX, or TXT files only.');
      return;
    }

    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);
    setError('');
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.state || !formData.county || !formData.topic) {
      setError('Please fill in all required fields');
      return;
    }

    if (uploadMode === 'file' && !selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (uploadMode === 'text' && !textContent.trim()) {
      setError('Please enter text content');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('state', formData.state);
      formDataToSend.append('county', formData.county);
      formDataToSend.append('topic', formData.topic);
      formDataToSend.append('source_url', formData.sourceUrl);

      if (uploadMode === 'file' && selectedFile) {
        formDataToSend.append('file', selectedFile);
      } else if (uploadMode === 'text') {
        formDataToSend.append('text', textContent);
        formDataToSend.append('file_name', `${formData.county}_${formData.topic}_${Date.now()}.txt`);
      }

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          data.message || 'Upload successful! Processing will begin shortly.'
        );
        // Reset form
        setFormData({ state: '', county: '', topic: '', sourceUrl: '' });
        setSelectedFile(null);
        setTextContent('');
        setCounties([]);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('An error occurred during upload');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Research</h1>
        <p className="mt-1 text-gray-600">
          Upload legal research documents or paste text to be processed by legal-data-factory
        </p>
      </div>

      {/* Upload Mode Toggle */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setUploadMode('file')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            uploadMode === 'file'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          File Upload
        </button>
        <button
          onClick={() => setUploadMode('text')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            uploadMode === 'text'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Text Paste
        </button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Upload Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {uploadMode === 'file' ? 'Upload File' : 'Paste Text'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadMode === 'file' ? (
                  <div>
                    {/* Drag & Drop Area */}
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                        dragActive
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        or click to browse
                      </p>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileSelect(e.target.files[0]);
                          }
                        }}
                        accept=".pdf,.docx,.txt"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        PDF, DOCX, or TXT (max 10MB)
                      </p>
                    </div>

                    {/* Selected File */}
                    {selectedFile && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Paste your research text here..."
                      rows={15}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {textContent.length} characters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Metadata Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={handleStateChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* County */}
                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Select
                    value={formData.county}
                    onValueChange={(value) =>
                      setFormData({ ...formData, county: value })
                    }
                    disabled={!formData.state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county.value} value={county.value}>
                          {county.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Select
                    value={formData.topic}
                    onValueChange={(value) =>
                      setFormData({ ...formData, topic: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Source URL */}
                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Source URL (optional)</Label>
                  <Input
                    id="sourceUrl"
                    type="url"
                    value={formData.sourceUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, sourceUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500">
                    URL where this information was found
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Status Messages */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li>1. Upload a file or paste text with metadata (state, county, topic)</li>
            <li>2. File is saved to Supabase Storage with status "pending"</li>
            <li>3. legal-data-factory automatically picks up pending files</li>
            <li>4. Processing extracts text, generates embeddings, classifies content, and extracts citations</li>
            <li>5. Monitor progress in the Processing Status page</li>
            <li>6. Once complete, data appears in county pages and search results</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
