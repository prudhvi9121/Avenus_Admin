import { motion } from 'framer-motion';
import { useState } from 'react';
import { useModal } from '../contexts/ModalContext';

const AdmissionForm = () => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="text-center bg-[#4195d1] text-white py-6 px-8">
        <h2 className="text-3xl font-bold mb-2">Apply for Admission</h2>
        <p className="text-white/90 text-lg">
          Take the first step towards providing your child with an exceptional education experience.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <h3 className="text-2xl font-semibold text-[#4195d1] mb-4">Student Information</h3>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Student's Full Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Grade Applying For</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              >
                <option value="">Select Grade</option>
                <option value="nursery">Nursery</option>
                <option value="kg">Kindergarten</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={`grade${i + 1}`}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Previous School (if any)</label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
              />
            </div>

            <div className="col-span-2">
              <h3 className="text-2xl font-semibold text-[#4195d1] mt-6 mb-4">Parent/Guardian Information</h3>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Parent's Full Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="block text-gray-700 font-medium">Residential Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="block text-gray-700 font-medium">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4195d1] focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-[#4195d1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3784c0] transform hover:scale-105 transition-all duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AdmissionForm;
