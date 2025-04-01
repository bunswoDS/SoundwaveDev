import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Upload, Play } from 'lucide-react';

interface Sound {
  id: number;
  name: string;
  category: string;
  language: string;
  soundFile: string;
  answerText: string;
  answerAudio: string;
}

const SoundsManagement: React.FC = () => {
  // Mock data for sounds
  const [sounds, setSounds] = useState<Sound[]>([
    { id: 1, name: 'Dog Bark', category: 'Animals', language: 'English', soundFile: 'dog_bark.mp3', answerText: 'Dog Bark', answerAudio: 'dog_bark_answer.mp3' },
    { id: 2, name: 'Car Horn', category: 'Industrial', language: 'English', soundFile: 'car_horn.mp3', answerText: 'Car Horn', answerAudio: 'car_horn_answer.mp3' },
    { id: 3, name: 'Ocean Waves', category: 'Environment', language: 'English', soundFile: 'ocean_waves.mp3', answerText: 'Ocean Waves', answerAudio: 'ocean_waves_answer.mp3' },
    { id: 4, name: 'Keyboard Typing', category: 'Home & Office', language: 'English', soundFile: 'keyboard_typing.mp3', answerText: 'Keyboard Typing', answerAudio: 'keyboard_typing_answer.mp3' },
    { id: 5, name: 'Aboiement de chien', category: 'Animals', language: 'French', soundFile: 'dog_bark.mp3', answerText: 'Aboiement de chien', answerAudio: 'dog_bark_answer_fr.mp3' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [newSound, setNewSound] = useState<Partial<Sound>>({
    name: '',
    category: 'Animals',
    language: 'English',
    soundFile: '',
    answerText: '',
    answerAudio: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Animals', 'Games', 'Industrial', 'Environment', 'Home & Office', 'Music'];
  const languages = ['English', 'French'];

  const filteredSounds = sounds.filter(sound => {
    const matchesCategory = selectedCategory === 'All' || sound.category === selectedCategory;
    const matchesSearch = sound.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddSound = () => {
    const newId = Math.max(...sounds.map(s => s.id), 0) + 1;
    const soundToAdd = {
      id: newId,
      name: newSound.name || '',
      category: newSound.category || 'Animals',
      language: newSound.language || 'English',
      soundFile: newSound.soundFile || '',
      answerText: newSound.answerText || '',
      answerAudio: newSound.answerAudio || ''
    };
    
    setSounds([...sounds, soundToAdd]);
    setNewSound({
      name: '',
      category: 'Animals',
      language: 'English',
      soundFile: '',
      answerText: '',
      answerAudio: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSound = () => {
    if (!currentSound) return;
    
    setSounds(sounds.map(sound => 
      sound.id === currentSound.id ? currentSound : sound
    ));
    setIsEditDialogOpen(false);
  };

  const handleDeleteSound = () => {
    if (!currentSound) return;
    
    setSounds(sounds.filter(sound => sound.id !== currentSound.id));
    setIsDeleteDialogOpen(false);
  };

  const generateAnswerAudio = (text: string, language: string) => {
    // In a real implementation, this would call Eleven Labs API
    console.log(`Generating audio for "${text}" in ${language}`);
    return `${text.toLowerCase().replace(/\s+/g, '_')}_answer_${language === 'French' ? 'fr' : 'en'}.mp3`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sounds Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add New Sound
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Sound</DialogTitle>
              <DialogDescription>
                Add a new sound to the library. Upload sound files and provide answer details.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={newSound.name}
                  onChange={(e) => setNewSound({...newSound, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select 
                  value={newSound.category} 
                  onValueChange={(value) => setNewSound({...newSound, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== 'All').map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">Language</Label>
                <Select 
                  value={newSound.language} 
                  onValueChange={(value) => setNewSound({...newSound, language: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="soundFile" className="text-right">Sound File</Label>
                <div className="col-span-3 flex">
                  <Input 
                    id="soundFile" 
                    className="flex-1 mr-2" 
                    value={newSound.soundFile}
                    onChange={(e) => setNewSound({...newSound, soundFile: e.target.value})}
                    placeholder="sound_file.mp3"
                  />
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answerText" className="text-right">Answer Text</Label>
                <Input 
                  id="answerText" 
                  className="col-span-3" 
                  value={newSound.answerText}
                  onChange={(e) => setNewSound({...newSound, answerText: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answerAudio" className="text-right">Answer Audio</Label>
                <div className="col-span-3 flex">
                  <Input 
                    id="answerAudio" 
                    className="flex-1 mr-2" 
                    value={newSound.answerAudio}
                    onChange={(e) => setNewSound({...newSound, answerAudio: e.target.value})}
                    placeholder="answer_audio.mp3"
                  />
                  <Button 
                    variant="outline" 
                    className="flex items-center mr-2"
                    onClick={() => {
                      if (newSound.answerText) {
                        const generatedFileName = generateAnswerAudio(newSound.answerText, newSound.language || 'English');
                        setNewSound({...newSound, answerAudio: generatedFileName});
                      }
                    }}
                  >
                    Generate
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddSound}>Add Sound</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sounds..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sound Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Language</th>
                  <th className="text-left py-3 px-4 font-medium">Sound</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSounds.map((sound) => (
                  <tr key={sound.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{sound.id}</td>
                    <td className="py-3 px-4">{sound.name}</td>
                    <td className="py-3 px-4">{sound.category}</td>
                    <td className="py-3 px-4">{sound.language}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Dialog open={isEditDialogOpen && currentSound?.id === sound.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentSound(sound);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Edit Sound</DialogTitle>
                              <DialogDescription>
                                Update sound details and files.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {currentSound && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                                  <Input 
                                    id="edit-name" 
                                    className="col-span-3" 
                                    value={currentSound.name}
                                    onChange={(e) => setCurrentSound({...currentSound, name: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-category" className="text-right">Category</Label>
                                  <Select 
                                    value={currentSound.category} 
                                    onValueChange={(value) => setCurrentSound({...currentSound, category: value})}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.filter(c => c !== 'All').map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-language" className="text-right">Language</Label>
                                  <Select 
                                    value={currentSound.language} 
                                    onValueChange={(value) => setCurrentSound({...currentSound, language: value})}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {languages.map((language) => (
                                        <SelectItem key={language} value={language}>{language}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-soundFile" className="text-right">Sound File</Label>
                                  <div className="col-span-3 flex">
                                    <Input 
                                      id="edit-soundFile" 
                                      className="flex-1 mr-2" 
                                      value={currentSound.soundFile}
                                      onChange={(e) => setCurrentSound({...currentSound, soundFile: e.target.value})}
                                    />
                                    <Button variant="outline" className="flex items-center">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-answerText" className="text-right">Answer Text</Label>
                                  <Input 
                                    id="edit-answerText" 
                                    className="col-span-3" 
                                    value={currentSound.answerText}
                                    onChange={(e) => setCurrentSound({...currentSound, answerText: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-answerAudio" className="text-right">Answer Audio</Label>
                                  <div className="col-span-3 flex">
                                    <Input 
                                      id="edit-answerAudio" 
                                      className="flex-1 mr-2" 
                                      value={currentSound.answerAudio}
                                      onChange={(e) => setCurrentSound({...currentSound, answerAudio: e.target.value})}
                                    />
                                    <Button 
                                      variant="outline" 
                                      className="flex items-center mr-2"
                                      onClick={() => {
                                        if (currentSound.answerText) {
                                          const generatedFileName = generateAnswerAudio(currentSound.answerText, currentSound.language);
                                          setCurrentSound({...currentSound, answerAudio: generatedFileName});
                                        }
                                      }}
                                    >
                                      Generate
                                    </Button>
                                    <Button variant="outline" className="flex items-center">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleEditSound}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && currentSound?.id === sound.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentSound(sound);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Sound</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{currentSound?.name}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDeleteSound}>Delete</Button>
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
            Showing {filteredSounds.length} of {sounds.length} sounds
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// StyleSheet not used in this component

export default SoundsManagement;
