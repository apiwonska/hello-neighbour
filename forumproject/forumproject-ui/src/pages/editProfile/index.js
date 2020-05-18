import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import _ from 'lodash';

import { ContainerDiv } from "../../components/styledDivs";
import {
  Input,
  TextArea,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from "../../components/styledForms";
import {
  ImageWrapper,
  Avatar
} from './style';
import { emailValidator } from "../../utils/validators";
import { SubmitButtonSmall } from "../../components/styledButtons";
import { fetchUser, updateUser } from "../../redux/actions";
import Spinner from "../../components/spinner";

class EditProfile extends React.Component {
  componentDidMount = () => {
    this.props.fetchUser(this.props.ownerId);
  };

  handleUpdateInfo = initialValues => async(values) => {
    console.log(values, initialValues)
    values.description = values.description || '';
    // Only submit the form if form values changed
    if (_.isEqual(values, initialValues)) return;
    // Username is read only
    delete values.username;
    console.log(values)

    await this.props.updateUser(values, this.props.ownerId)
    const errors = this.props.user.updateErrors;
    if (!_.isEmpty(errors)) return errors;
  };

  // handleFileSelect = (e) => {
  //   console.log(e.target.files[0])
  // }

  // handleFileUpload = () => {

  // }

  render() {
    // A value to ensure input id uniqueness
    const id = "ep2";
    const { user } = this.props;

    if (user.fetching) {
      return <Spinner />;
    }

    if (user.fetched) {
      const {username, email, description} = user.data
      const initialValues = { username, email, description};
      return (
        <ContainerDiv>

          {/* <div>
            <ImageWrapper>
              <Avatar src={ user.data.avatar} alt="User avatar"/>
            </ImageWrapper>
            <input type="file" onChange={this.handleFileSelect}/>
            <button onClick={this.handleFileUpload}>Upload</button>
          </div> */}

          <FinalForm onSubmit={this.handleUpdateInfo(initialValues)} initialValues={initialValues}>
            {({ handleSubmit, pristine, hasValidationErrors }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FormWrapper>
                    <FormGroup>
                      <Label htmlFor={`username-${id}`}>Username:</Label>
                      <Input
                        id={`username-${id}`}
                        value={initialValues.username}
                        disabled="disabled"
                        type="text"
                      />
                    </FormGroup>
                    <Field name="email" validate={emailValidator} >
                      {({ input, meta: { touched, error, submitError } }) => (
                        <FormGroup>
                          <Label htmlFor={`email-${id}`}>Email:</Label>
                          <Input {...input} id={`email-${id}`} type="email" />
                          <FormError>
                            {touched && (error || submitError)}
                          </FormError>
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="description">
                      {({ input, meta: { touched, error, submitError } }) => (
                        <FormGroup>
                          <Label htmlFor={`description-${id}`}>
                            Description:
                          </Label>
                          <TextArea
                            {...input}
                            id={`description-${id}`}
                            rows="6"
                            maxLength="1000"
                            placeholder="Tell us about yourself"
                          />
                          <FormError>
                            {touched && (error || submitError)}
                          </FormError>
                        </FormGroup>
                      )}
                    </Field>
                    <SubmitButtonSmall
                      type="submit"
                      value="Update Profile"
                      disable={pristine || hasValidationErrors}
                    />
                  </FormWrapper>
                </form>
              );
            }}
          </FinalForm>
        </ContainerDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    ownerId: state.auth.user.id,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser, updateUser })(EditProfile);
