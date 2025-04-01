import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Upload, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface Language {
  id: number;
  code: string;
  name: string;
  status: 'Active' | 'Pending';
  localizationFile?: string;
  completionPercentage?: number;
}

const LanguagesManagement: React.FC = () => {
  // Mock data for languages
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, code: 'en', name: 'English', status: 'Active', localizationFile: 'en.json', completionPercentage: 100 },
    { id: 2, code: 'fr', name: 'French', status: 'Active', localizationFile: 'fr.json', completionPercentage: 85 },
    { id: 3, code: 'es', name: 'Spanish', status: 'Pending', localizationFile: '', completionPercentage: 0 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [newLanguage, setNewLanguage] = useState<Partial<Language>>({
    code: '',
    name: '',
    status: 'Pending',
    localizationFile: '',
    completionPercentage: 0
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jsonContent, setJsonContent] = useState<string>('{\n  "app.title": "SoundWave",\n  "button.replay": "Replay",\n  "button.reveal": "Reveal",\n  "settings.title": "Settings"\n}');

  const filteredLanguages = languages.filter(language => {
    return language.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           language.code.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddLanguage = () => {
    const newId = Math.max(...languages.map(l => l.id), 0) + 1;
    const languageToAdd = {
      id: newId,
      code: newLanguage.code || '',
      name: newLanguage.name || '',
      status: newLanguage.status || 'Pending',
      localizationFile: newLanguage.localizationFile || '',
      completionPercentage: newLanguage.completionPercentage || 0
    };
    
    setLanguages([...languages, languageToAdd]);
    setNewLanguage({
      code: '',
      name: '',
      status: 'Pending',
      localizationFile: '',
      completionPercentage: 0
    });
    setIsAddDialogOpen(false);
  };

  const handleEditLanguage = () => {
    if (!currentLanguage) return;
    
    setLanguages(languages.map(language => 
      language.id === currentLanguage.id ? currentLanguage : language
    ));
    setIsEditDialogOpen(false);
  };

  const handleDeleteLanguage = () => {
    if (!currentLanguage) return;
    
    setLanguages(languages.filter(language => language.id !== currentLanguage.id));
    setIsDeleteDialogOpen(false);
  };

  const handleUploadLocalization = () => {
    if (!currentLanguage) return;
    
    // In a real implementation, this would process the JSON content
    // and update the localization file
    const updatedLanguage = {
      ...currentLanguage,
      localizationFile: `${currentLanguage.code}.json`,
      status: 'Active' as const,
      completionPercentage: 100
    };
    
    setLanguages(languages.map(language => 
      language.id === currentLanguage.id ? updatedLanguage : language
    ));
    setIsUploadDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Languages Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add New Language
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
              <DialogDescription>
                Add a new language to the system. You can upload localization files later.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Language Code</Label>
                <Input 
                  id="code" 
                  className="col-span-3" 
                  value={newLanguage.code}
                  onChange={(e) => setNewLanguage({...newLanguage, code: e.target.value})}
                  placeholder="en, fr, es, etc."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Language Name</Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                  placeholder="English, French, Spanish, etc."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select 
                  value={newLanguage.status} 
                  onValueChange={(value: 'Active' | 'Pending') => setNewLanguage({...newLanguage, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddLanguage}>Add Language</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search languages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Code</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Completion</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLanguages.map((language) => (
                  <tr key={language.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{language.id}</td>
                    <td className="py-3 px-4">{language.code}</td>
                    <td className="py-3 px-4">{language.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant={language.status === 'Active' ? 'default' : 'secondary'} className={language.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {language.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${language.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{language.completionPercentage}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Dialog open={isEditDialogOpen && currentLanguage?.id === language.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentLanguage(language);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Edit Language</DialogTitle>
                              <DialogDescription>
                                Update language details.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {currentLanguage && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-code" className="text-right">Language Code</Label>
                                  <Input 
                                    id="edit-code" 
                                    className="col-span-3" 
                                    value={currentLanguage.code}
                                    onChange={(e) => setCurrentLanguage({...currentLanguage, code: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">Language Name</Label>
                                  <Input 
                                    id="edit-name" 
                                    className="col-span-3" 
                                    value={currentLanguage.name}
                                    onChange={(e) => setCurrentLanguage({...currentLanguage, name: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-status" className="text-right">Status</Label>
                                  <Select 
                                    value={currentLanguage.status} 
                                    onValueChange={(value: 'Active' | 'Pending') => setCurrentLanguage({...currentLanguage, status: value})}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Active">Active</SelectItem>
                                      <SelectItem value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleEditLanguage}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isUploadDialogOpen && currentLanguage?.id === language.id} onOpenChange={(open) => {
                          setIsUploadDialogOpen(open);
                          if (open) setCurrentLanguage(language);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Upload Localization">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Upload Localization File</DialogTitle>
                              <DialogDescription>
                                Upload or paste JSON localization content for {currentLanguage?.name}.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="json-content">JSON Content</Label>
                                <Textarea 
                                  id="json-content" 
                                  className="font-mono h-64" 
                                  value={jsonContent}
                                  onChange={(e) => setJsonContent(e.target.value)}
                                />
                              </div>
                              
                              <div className="flex justify-between">
                                <Button variant="outline" className="flex items-center">
                                  <Upload className="mr-2 h-4 w-4" /> Upload File
                                </Button>
                                <Button variant="outline" className="flex items-center">
                                  <Download className="mr-2 h-4 w-4" /> Download Template
                                </Button>
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleUploadLocalization}>Save Localization</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && currentLanguage?.id === language.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentLanguage(language);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Language</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete {currentLanguage?.name} ({currentLanguage?.code})? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDeleteLanguage}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLanguages.length} of {languages.length} languages
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// StyleSheet not used in this component

export default LanguagesManagement;
