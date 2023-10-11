import * as yup from "yup";


export const signUpSchema = yup.object().shape({
	username: yup
	.string()
	.required("please enter you're user name")
	.min(1, "must be at least 1 character")
	.max(8, "must be at most 8 character"),
	id: yup
	.string()
	.required("please enter you're user id")
	.test("no-spaces", "spaces are not allowed", value => {
      return value && !/\s/.test(value);
    })
	.matches(/^[A-Za-z][A-Za-z0-9]*$/, "letters and numbers only, start with a letter")
	.min(7, "must be at least 7 character")
	.max(15, "must be at most 15 character"),
	password: yup
	.string()
	.required("please enter you're password")
	.min(7, "must be at least 7 character")
	.max(15, "must be at most 15 character")
})

export const signInSchema = yup.object().shape({
	id: yup
	.string()
	.required("please enter you're user id")
	.test("no-spaces", "spaces are not allowed", value => {
      return value && !/\s/.test(value);
    })
	.matches(/^[A-Za-z][A-Za-z0-9]*$/, "start with a letter, numbers allowed")
	.min(7, "must be at least 7 character")
	.max(15, "must be at most 15 character"),
	password: yup
	.string()
	.required("please enter you're password")
	.min(7, "must be at least 7 character")
	.max(15, "must be at most 15 character")
})