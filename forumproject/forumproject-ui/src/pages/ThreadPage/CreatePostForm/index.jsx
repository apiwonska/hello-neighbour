import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import { TextArea } from 'layout';
import { CreatePostWrapper, SubmitButtonWrapper, SmallButton } from './style';

const CreatePostForm = React.forwardRef(({ onSubmit }, ref) => {
  return (
    <>
      <CreatePostWrapper>
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, values, form }) => (
            <form
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
            >
              <Field name="content">
                {({ input }) => (
                  <TextArea
                    {...input}
                    ref={ref}
                    rows="3"
                    placeholder="Add your comment.."
                    maxLength="2000"
                  />
                )}
              </Field>
              {values.content && (
                <SubmitButtonWrapper>
                  <SmallButton
                    size="S"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Cancel
                  </SmallButton>
                  <SmallButton type="submit" color="blue" size="S">
                    Save
                  </SmallButton>
                </SubmitButtonWrapper>
              )}
            </form>
          )}
        </Form>
      </CreatePostWrapper>
    </>
  );
});

CreatePostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePostForm;
