import { expect, test } from 'vitest'
import ArticleApi from '../../../src/services/api/articles'


const myAPI = new ArticleApi({});


test('getArticleGroup func: get all articles by goupkey', () => {  
    return myAPI.getArticleGroup("adminTags",{l:3}).then(data => {
      expect.soft(data).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining({ 
              "_id":      expect.any(Object), 
              "articles": expect.any(Array),
          })
        ]) 
      )     
    })
  })





test('getArticles func: get articles by params', async () => {  
    const data = await myAPI.getArticles({l:2});

    expect.soft(data).toEqual( 
        expect.arrayContaining([ 
        expect.objectContaining({ 
            "_id":        expect.any(String), 
            "coverImage": expect.any(Object),
            "title":       expect.any(Object),
            "content":  expect.any(Object),
            "tags": expect.any(Array),
            "customTags": expect.any(Array),
            "meta": expect.any(Object),
            "adminTags":expect.any(Array),
            "customTagsInfo": expect.any(Array),
            "summary":expect.any(Object)
        })
        ]) 
    );
    
    expect.soft(data).toHaveLength(2);
  
})


test('getArticles func: get articles on specific field', async () => {  
    const data = await myAPI.getArticles({f:{"title":1} , l:3});
    
    expect.soft(data).toEqual( 
        expect.arrayContaining([ 
            expect.objectContaining({ 
                "_id":        expect.any(String),        
                "title":       expect.any(Object)      
            })
        ])
    );

    expect.soft(data).toHaveLength(3);           
    
  })




  test('getArticleById ', async () => {  
    const data = await myAPI.getArticleById({id:"5a8355911904840001957e9f"},{l:1});

    expect.soft(data).toEqual( 
        expect.arrayContaining([  
        expect.objectContaining({ 
            "_id":        expect.stringContaining("5a8355911904840001957e9f"), 
            "coverImage": expect.any(Object),
            "title":      expect.any(Object),
            "content":    expect.any(Object),
            "tags":       expect.any(Array),
            "customTags": expect.any(Array),
            "meta":       expect.any(Object),
            "adminTags":  expect.any(Array),
            "customTagsInfo": expect.any(Array),
            "summary":        expect.any(Object)
        })
      ])
    );

    expect.soft(data).toHaveLength(1); 
  })


  test('getArticlesByTag ', async () => {  
    const data = await myAPI.getArticlesByTag("",{l:1});
      expect.soft(data).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining({ 
              "_id":        expect.any(String), 
              "coverImage": expect.any(Object),
              "title":       expect.any(Object),
              "content":  expect.any(Object),
              "tags": expect.any(Array),
              "customTags": expect.any(Array),
              "meta": expect.any(Object),
              "adminTags":expect.any(Array),
              "customTagsInfo": expect.any(Array),
              "summary":expect.any(Object)
          })
        ]) 
      );   
    
  })
   
  test('getArticleAdminTags ', async () => {  
    const data = await  myAPI.getArticleAdminTags({l:3});
     
    expect.soft(data).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining({ 
              "_id":        expect.any(String),   
              "title":       expect.any(String),  
          })
        ]) 
    );  
    
    expect.soft(data).toHaveLength(3); 
  })