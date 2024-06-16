import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Post } from '../../types';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private router: Router, private service: DataService) {}

  ngOnInit(): void {}

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

  createPost() {
      if (this.post.title != '' && this.post.description != '' && (this.post.image != '' || this.post.imageUrl != ''))
        {
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
    
      getBase64(file : File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
     
  
}

