import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import { StyledTextArea, SubmitButton } from './style';

const CreatePostForm = React.forwardRef((props, ref) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit, values, form }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event);
            form.reset();
          }}
        >
          <Field name="content">
            {({ input }) => (
              <StyledTextArea
                {...input}
                ref={ref}
                rows="3"
                placeholder="Add your comment.."
                maxLength="2000"
              />
            )}
          </Field>
          {values.content && (
            <SubmitButton
              type="submit"
              value="Submit Post"
              color="greenOutline"
            />
          )}
        </form>
      )}
    </Form>
  );
});

CreatePostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePostForm;
