import { Link } from "react-router-dom";

export default function Comment({ comment }) {
   return (
      <details open className="comment">
         <summary>
            <Link to={`/user/${comment.user}`}>{comment.user}</Link>{" "}
            {comment.time_ago}
         </summary>
         <article>
            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            {comment.comments_count > 0
               ? comment.comments.map((comment, index) => {
                    return (
                       <div key={comment.id} className="comment-children">
                          <Comment comment={comment} />
                       </div>
                    );
                 })
               : undefined}
         </article>
      </details>
   );
}
