import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form as FinalForm } from 'react-final-form';

import { required } from 'utils/validators';
import { Footer, TextArea, Button } from './style';

const UpdatePostForm = ({
  handleUpdatePost,
  handleHideUpdateForm,
  content,
  textareaRef,
}) => (
  <FinalForm onSubmit={handleUpdatePost} initialValues={{ content }}>
    {({ handleSubmit, hasValidationErrors }) => (
      <form onSubmit={handleSubmit}>
        <>
          <Field name="content" validate={required}>
            {({ input }) => (
              <TextArea {...input} maxLength="2000" ref={textareaRef} />
            )}
          </Field>
          <Footer>
            <Button type="button" onClick={handleHideUpdateForm} size="S">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={hasValidationErrors}
              color="blue"
              size="S"
            >
              Save
            </Button>
          </Footer>
        </>
      </form>
    )}
  </FinalForm>
);

UpdatePostForm.propTypes = {
  handleUpdatePost: PropTypes.func.isRequired,
  handleHideUpdateForm: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  textareaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default UpdatePostForm;
