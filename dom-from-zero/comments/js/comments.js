'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  commentsContainer.appendChild(renderingBrowserEngine(list.map(comment => createComment(comment))));
}

function createComment(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attrs: {
          title: comment.author.name,
        },
        content:
          {
            tag: 'div',
            cls: 'avatar',
            attrs: {
              style: `background-image: url('${comment.author.pic}')`,
            }
          }

      },
      {
        tag: 'div',
        cls: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
            content: `${comment.text.split('\\n').join('<br>')}`
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul',
                cls: 'comment-actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function renderingBrowserEngine(block) {
  if ((typeof block === 'string') || (typeof block === 'number' ) || (block === true)) {
    return document.createTextNode(block);
  }

  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }

  if (Array.isArray(block)) {
    return block.reduce((f, elem) => {
      f.appendChild(renderingBrowserEngine(elem));
      return f;
    }, document.createDocumentFragment())
  }

  const element = document.createElement(block.tag);

  [].concat(block.cls).filter(Boolean).forEach(className => element.classList.add(className));

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {

      element.setAttribute(key, block.attrs[key]);
    })
  }

  element.appendChild(renderingBrowserEngine(block.content));
  return element;
}


fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);





