import React from 'react';

const Comment = ({ comment }) => { Aquí tienes el componente **Comment.js** completado:

### 7. **Comment.js**

```javascript
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.user}: {comment.comment}</p>
    </div>
  );
};

export default Comment;