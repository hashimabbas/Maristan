import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Offer } from './../../types/Offer';

interface OfferFormProps {
    initialValues: Offer; // Ensure initialValues is ALWAYS an Offer
    onSubmit: (values: Offer, actions: any) => void;
    onCancel?: () => void;
}

const OfferForm: React.FC<OfferFormProps> = ({ initialValues, onSubmit, onCancel }) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        discount_percentage: Yup.number()
            .required('Discount Percentage is required')
            .min(0, 'Discount must be at least 0')
            .max(100, 'Discount must be at most 100'),
        start_date: Yup.date().required('Start Date is required'),
        end_date: Yup.date()
            .required('End Date is required')
            .min(Yup.ref('start_date'), 'End Date must be after Start Date'),
        image: Yup.mixed()
            .nullable()
            .test(
                'fileSize',
                'File Size is too large',
                (value: any) => value === null || (value && value.size <= 2048 * 1024) // 2MB
            )
            .test(
                'fileType',
                'Unsupported File Format',
                (value: any) =>
                    value === null || (value && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(value.type))
            ),
        is_active: Yup.boolean().default(true),
    });

    const handleSubmit = async (values: Offer, actions: any) => {
        // Convert dates to string format compatible with Laravel
        const formattedValues = {
            ...values,
            start_date: values.start_date ? values.start_date.toISOString().slice(0, 10) : null,
            end_date: values.end_date ? values.end_date.toISOString().slice(0, 10) : null,
        };
        onSubmit(formattedValues, actions);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                        <Field type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <Field as="textarea" id="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="discount_percentage" className="block text-gray-700 text-sm font-bold mb-2">Discount Percentage:</label>
                        <Field type="number" id="discount_percentage" name="discount_percentage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="discount_percentage" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                        <Field type="date" id="start_date" name="start_date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="start_date" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                        <Field type="date" id="end_date" name="end_date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="end_date" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(event: any) => {
                                setFieldValue('image', event.currentTarget.files[0]);
                            }}
                        />
                        <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    <div>
                        <label htmlFor="is_active" className="inline-flex items-center mt-3">
                            <Field type="checkbox" id="is_active" name="is_active" className="form-checkbox h-5 w-5 text-green-500" />
                            <span className="ml-2 text-gray-700">Active</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        {onCancel && (
                            <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Cancel
                            </button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default OfferForm;
