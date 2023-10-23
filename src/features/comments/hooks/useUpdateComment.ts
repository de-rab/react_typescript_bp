import { useForm } from '../../../lib/useForm';
import { Comment, CommentEditorState } from '../types';
import { useUpdateCommentMutation } from '../api/commentsApi';

type useUpdateCommentProps = {
  comment: Comment;
  onSuccess?: (payload: Comment) => void;
  onFail?: (error: unknown) => void;
};

export const useUpdateComment = ({ comment, onSuccess, onFail }: useUpdateCommentProps) => {
  const useFormApi = useForm<CommentEditorState>({ defaultValues: { body: comment.body } });
  const { handleSubmit } = useFormApi;

  const [updateComment, mutationState] = useUpdateCommentMutation();

  const onSubmitHandler = handleSubmit(async (data) => {
    try {
      const payload = await updateComment({ id: comment.id, body: data.body }).unwrap();
      onSuccess?.(payload);
    } catch (err) {
      onFail?.(err);
    }
  });

  return { useFormApi, onSubmitHandler, mutationState };
};