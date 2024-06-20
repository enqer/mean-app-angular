import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { EditPost, Post } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{

  public post = {
    image: '',
    imageUrl: '',
    description: '',
    title: ''
  };
  public id :string = '';

  constructor(private router: Router, private service: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        id = params.get('id');
      });
    this.service.getById(id).subscribe((res: any) => {
      const post = res;
      this.post.imageUrl = post['image'];
      this.post.description = post['text'];
      this.post.title = post['title'];
      this.id = id;
    });
  }

  async onFileSelected(event: any) {
    if(event.target.files.length > 0) 
     {
        this.getBase64(event.target.files[0]).then(
        data => { 
           
          if (typeof data === 'string')
            this.post.image = data
        }
      );
     }
  }


  isEdit() {
    return this.id !== '';
  }

  createPost() {
      if (this.post.title != '' && this.post.description != '' && (this.post.image != '' || this.post.imageUrl != ''))
        {
          if (this.id != ''){
            const editedPost: EditPost = {
              id: this.id,
              text: this.post.description,
              image: this.post.imageUrl || this.post.image,
              title: this.post.title
            }
            this.service.editPost(editedPost).subscribe(res => {
              this.router.navigate(['/']);
            });
          }
          else {
            const newPost: Post = {
              text: this.post.description,
              image: this.post.imageUrl || this.post.image,
              title: this.post.title
            }
            this.service.createPost(newPost).subscribe(res => {
              this.router.navigate(['/']);
            });
          }
        }
      }
    
      getBase64(file : File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
     
  
}

