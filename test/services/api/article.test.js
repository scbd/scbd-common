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
        "_id":            expect.any(String), 
        "coverImage":     expect.any(Object),
        "title":          expect.any(Object),
        "content":        expect.any(Object),
        "tags":           expect.any(Array),
        "customTags":     expect.any(Array),
        "meta":           expect.any(Object),
        "adminTags":      expect.any(Array),
        "customTagsInfo": expect.any(Array),
        "summary":        expect.any(Object)
      })
    ]) 
  );
  
  expect.soft(data).toHaveLength(2);  
})


test('getArticles func: get articles on specific field', async () => {  
    const data = await myAPI.getArticles({f:{title:1} , l:3});
    
    expect.soft(data).toEqual( 
      expect.arrayContaining([ 
        expect.objectContaining({ 
          "_id":   expect.any(String),        
          "title": expect.any(Object)      
        })
      ])
    );

    expect.soft(data).toHaveLength(3); 
})




test('getArticleById ', async () => {  
  const data = await myAPI.getArticleById("5a8355911904840001957e9f",{l:1});

  expect.soft(data).toEqual(   
    expect.objectContaining({ 
      "_id":            expect.stringContaining("5a8355911904840001957e9f"), 
      "coverImage":     expect.any(Object),
      "title":          expect.any(Object),
      "content":        expect.any(Object),
      "tags":           expect.any(Array),
      "customTags":     expect.any(Array),
      "meta":           expect.any(Object),
      "adminTags":      expect.any(Array),
      "customTagsInfo": expect.any(Array),
      "summary":        expect.any(Object)
  })  
  );
})


test('getArticlesByTag ', async () => {  
  const data = await myAPI.getArticlesByTag("52000000cbd0330000001948",{l:3});

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "_id":            expect.any(String), 
        "adminTags":      expect.any(Array),      
        "content":        expect.any(Object),        
        "customTags":     expect.any(Array),
        "customTagsInfo": expect.any(Array),
        "meta":           expect.any(Object),
        "summary":        expect.any(Object),
        "tags":           expect.any(Array),
        "tagsInfo":       expect.any(Array),
        "title":          expect.any(Object),
      })
    ]) 
  ); 
    
  expect.soft(data).toHaveLength(3);     
})


test('getArticlesByTag: multiple query', async () => {  
  const data = await myAPI.getArticlesByTag("52000000cbd0330000001948",{ q:{customTags:{"$oid":"5acb8d46e57fe1000109191e"}},l:2});

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "_id":            expect.any(String), 
        "adminTags":      expect.any(Array),      
        "content":        expect.any(Object),        
        "customTags":     expect.any(Array),
        "customTagsInfo": expect.any(Array),
        "meta":           expect.any(Object),
        "summary":        expect.any(Object),
        "tags":           expect.any(Array),
        "tagsInfo":       expect.any(Array),
        "title":          expect.any(Object),
      })
    ]) 
  ); 
  expect.soft(data).toHaveLength(2);     
})


   
  test('getArticleAdminTags ', async () => {  
    const data = await  myAPI.getArticleAdminTags({l:3});
     
    expect.soft(data).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining({ 
            "_id":   expect.any(String),   
            "title": expect.any(String),  
          })
        ]) 
    );  
    
    expect.soft(data).toHaveLength(3); 
  })