import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Upload, Image } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  language: string;
  imageNormal: string;
  imageHover: string;
  imageClick: string;
}

const CategoriesManagement: React.FC = () => {
  // Mock data for categories
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Games', language: 'English', imageNormal: '/images/games.png', imageHover: '/images/games_hover.png', imageClick: '/images/games_click.png' },
    { id: 2, name: 'Animals', language: 'English', imageNormal: '/images/animals.png', imageHover: '/images/animals_hover.png', imageClick: '/images/animals_click.png' },
    { id: 3, name: 'Industrial', language: 'English', imageNormal: '/images/industrial.png', imageHover: '/images/industrial_hover.png', imageClick: '/images/industrial_click.png' },
    { id: 4, name: 'Environment', language: 'English', imageNormal: '/images/environment.png', imageHover: '/images/environment_hover.png', imageClick: '/images/environment_click.png' },
    { id: 5, name: 'Home & Office', language: 'English', imageNormal: '/images/home_office.png', imageHover: '/images/home_office_hover.png', imageClick: '/images/home_office_click.png' },
    { id: 6, name: 'Music', language: 'English', imageNormal: '/images/music.png', imageHover: '/images/music_hover.png', imageClick: '/images/music_click.png' },
    { id: 7, name: 'Jeux', language: 'French', imageNormal: '/images/games.png', imageHover: '/images/games_hover.png', imageClick: '/images/games_click.png' },
    { id: 8, name: 'Animaux', language: 'French', imageNormal: '/images/animals.png', imageHover: '/images/animals_hover.png', imageClick: '/images/animals_click.png' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    language: 'English',
    imageNormal: '',
    imageHover: '',
    imageClick: ''
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const languages = ['All', 'English', 'French'];

  const filteredCategories = categories.filter(category => {
    const matchesLanguage = selectedLanguage === 'All' || category.language === selectedLanguage;
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  const handleAddCategory = () => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const categoryToAdd = {
      id: newId,
      name: newCategory.name || '',
      language: newCategory.language || 'English',
      imageNormal: newCategory.imageNormal || '',
      imageHover: newCategory.imageHover || '',
      imageClick: newCategory.imageClick || ''
    };
    
    setCategories([...categories, categoryToAdd]);
    setNewCategory({
      name: '',
      language: 'English',
      imageNormal: '',
      imageHover: '',
      imageClick: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = () => {
    if (!currentCategory) return;
    
    setCategories(categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    ));
    setIsEditDialogOpen(false);
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    setCategories(categories.filter(category => category.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Add a new category to the library. Upload images for normal, hover, and click states.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">Language</Label>
                <Select 
                  value={newCategory.language} 
                  onValueChange={(value) => setNewCategory({...newCategory, language: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.filter(l => l !== 'All').map((language) => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageNormal" className="text-right">Normal Image</Label>
                <div className="col-span-3 flex">
                  <Input 
                    id="imageNormal" 
                    className="flex-1 mr-2" 
                    value={newCategory.imageNormal}
                    onChange={(e) => setNewCategory({...newCategory, imageNormal: e.target.value})}
                    placeholder="/images/category.png"
                  />
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageHover" className="text-right">Hover Image</Label>
                <div className="col-span-3 flex">
                  <Input 
                    id="imageHover" 
                    className="flex-1 mr-2" 
                    value={newCategory.imageHover}
                    onChange={(e) => setNewCategory({...newCategory, imageHover: e.target.value})}
                    placeholder="/images/category_hover.png"
                  />
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageClick" className="text-right">Click Image</Label>
                <div className="col-span-3 flex">
                  <Input 
                    id="imageClick" 
                    className="flex-1 mr-2" 
                    value={newCategory.imageClick}
                    onChange={(e) => setNewCategory({...newCategory, imageClick: e.target.value})}
                    placeholder="/images/category_click.png"
                  />
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>{language}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Category Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Language</th>
                  <th className="text-left py-3 px-4 font-medium">Images</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{category.id}</td>
                    <td className="py-3 px-4">{category.name}</td>
                    <td className="py-3 px-4">{category.language}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Normal">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Hover">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Click">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Dialog open={isEditDialogOpen && currentCategory?.id === category.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentCategory(category);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                              <DialogDescription>
                                Update category details and images.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {currentCategory && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                                  <Input 
                                    id="edit-name" 
                                    className="col-span-3" 
                                    value={currentCategory.name}
                                    onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-language" className="text-right">Language</Label>
                                  <Select 
                                    value={currentCategory.language} 
                                    onValueChange={(value) => setCurrentCategory({...currentCategory, language: value})}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {languages.filter(l => l !== 'All').map((language) => (
                                        <SelectItem key={language} value={language}>{language}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-imageNormal" className="text-right">Normal Image</Label>
                                  <div className="col-span-3 flex">
                                    <Input 
                                      id="edit-imageNormal" 
                                      className="flex-1 mr-2" 
                                      value={currentCategory.imageNormal}
                                      onChange={(e) => setCurrentCategory({...currentCategory, imageNormal: e.target.value})}
                                    />
                                    <Button variant="outline" className="flex items-center">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-imageHover" className="text-right">Hover Image</Label>
                                  <div className="col-span-3 flex">
                                    <Input 
                                      id="edit-imageHover" 
                                      className="flex-1 mr-2" 
                                      value={currentCategory.imageHover}
                                      onChange={(e) => setCurrentCategory({...currentCategory, imageHover: e.target.value})}
                                    />
                                    <Button variant="outline" className="flex items-center">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-imageClick" className="text-right">Click Image</Label>
                                  <div className="col-span-3 flex">
                                    <Input 
                                      id="edit-imageClick" 
                                      className="flex-1 mr-2" 
                                      value={currentCategory.imageClick}
                                      onChange={(e) => setCurrentCategory({...currentCategory, imageClick: e.target.value})}
                                    />
                                    <Button variant="outline" className="flex items-center">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleEditCategory}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && currentCategory?.id === category.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentCategory(category);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Category</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{currentCategory?.name}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
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
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// StyleSheet not used in this component

export default CategoriesManagement;
