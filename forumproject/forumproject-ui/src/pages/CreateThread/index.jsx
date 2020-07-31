import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  PageTitle,
  TopBeam,
  Input,
  FormGroup,
  Label,
  TextArea,
  FormError,
  ContentWrapper,
} from 'layout';
import { createThread as createThread_ } from 'redux/actions';
import { titleValidator, subjectValidator } from 'utils/validators';
import { Button, FormGroupButtons } from './style';

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    this.refFocusInput = React.createRef();
  }

  componentDidMount() {
    this.refFocusInput.current.focus();
  }

  handleCreateThread = async (values) => {
    const { createThread, match } = this.props;
    const category = Number(match.params.categoryId);
    const formValues = { ...values };
    const data = {
      title: formValues.title || '',
      subject: formValues.subject || '',
      category,
    };
    await createThread(data);

    const { threadList } = this.props;
    const { errors } = threadList;
    if (errors) return errors;
    return null;
  };

  handleCancel = () => {
    const { match, history } = this.props;
    const { categoryId } = match.params;
    history.push(`/categories/${categoryId}`);
  };

  render() {
    // a value to ensure form input id uniqueness
    const id = 'ct';
    return (
      <>
        <TopBeam>
          <PageTitle>CreateThread</PageTitle>
        </TopBeam>
        <ContentWrapper>
          <FinalForm onSubmit={this.handleCreateThread}>
            {({ handleSubmit, pristine, hasValidationErrors }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field name="title" validate={titleValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <FormGroup>
                        <Label htmlFor={`title-${id}`}>Title:</Label>
                        <Input
                          {...input}
                          id={`title-${id}`}
                          maxLength="100"
                          ref={this.refFocusInput}
                        />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <Field name="subject" validate={subjectValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <FormGroup>
                        <Label htmlFor={`subject-${id}`}>Subject:</Label>
                        <TextArea
                          {...input}
                          id={`subject-${id}`}
                          rows="3"
                          maxLength="2000"
                        />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </FormGroup>
                    )}
                  </Field>
                  <FormGroupButtons>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button
                      type="submit"
                      disabled={pristine || hasValidationErrors}
                      color="blue"
                    >
                      Create Thread
                    </Button>
                  </FormGroupButtons>
                </div>
              </form>
            )}
          </FinalForm>
        </ContentWrapper>
      </>
    );
  }
}

CreateThread.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  threadList: PropTypes.shape({
    errors: PropTypes.shape({}),
  }).isRequired,
  createThread: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  threadList: state.threadList,
});

export default connect(mapStateToProps, { createThread: createThread_ })(
  CreateThread
);
