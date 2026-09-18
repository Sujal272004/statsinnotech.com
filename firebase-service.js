/**
 * Firebase Service Layer - Stats Innotech
 * Handles Firestore collections and Authentication.
 */

(function () {
  let db = null;
  let auth = null;

  function initFirebase() {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded.');
      return false;
    }

    if (!window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
      console.info('Firebase is not yet configured with real API keys in firebase-config.js.');
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }

    db = firebase.firestore();
    auth = firebase.auth();
    return true;
  }

  // -------------------------------------------------------------
  // 1. INQUIRY & FORM SUBMISSIONS (FIRESTORE)
  // -------------------------------------------------------------

  /**
   * Save Contact Inquiry to Firestore
   * Collection: 'contact_inquiries'
   */
  async function saveContactInquiry(inquiryData) {
    if (!initFirebase()) {
      console.log('Mock saving contact inquiry (Firebase unconfigured):', inquiryData);
      return { success: true, mock: true };
    }

    try {
      const docRef = await db.collection('contact_inquiries').add({
        name: inquiryData.name || '',
        email: inquiryData.email || '',
        phone: inquiryData.phone || '',
        interest: inquiryData.interest || 'General',
        message: inquiryData.message || '',
        status: 'New',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving contact inquiry:', error);
      throw error;
    }
  }

  /**
   * Save Internship Application to Firestore
   * Collection: 'internship_applications'
   */
  async function saveInternshipApplication(applicationData) {
    if (!initFirebase()) {
      console.log('Mock saving internship application (Firebase unconfigured):', applicationData);
      return { success: true, mock: true };
    }

    try {
      const docRef = await db.collection('internship_applications').add({
        name: applicationData.name || '',
        email: applicationData.email || '',
        phone: applicationData.phone || '',
        college: applicationData.college || '',
        domain: applicationData.domain || '',
        duration: applicationData.duration || '3 Months',
        mode: applicationData.mode || 'Remote',
        status: 'Pending Review',
        appliedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving internship application:', error);
      throw error;
    }
  }

  /**
   * Save Course Inquiry to Firestore
   * Collection: 'course_inquiries'
   */
  async function saveCourseInquiry(courseData) {
    if (!initFirebase()) {
      console.log('Mock saving course inquiry (Firebase unconfigured):', courseData);
      return { success: true, mock: true };
    }

    try {
      const docRef = await db.collection('course_inquiries').add({
        name: courseData.name || '',
        email: courseData.email || '',
        phone: courseData.phone || '',
        course: courseData.course || '',
        experience: courseData.experience || '',
        status: 'New',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving course inquiry:', error);
      throw error;
    }
  }

  // -------------------------------------------------------------
  // 2. STUDENT & ADMIN AUTHENTICATION
  // -------------------------------------------------------------

  /**
   * Register a new student account
   */
  async function registerStudent(name, email, password, course) {
    if (!initFirebase()) {
      throw new Error('Firebase credentials are not configured in firebase-config.js');
    }

    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Update Auth Profile Display Name
    await user.updateProfile({ displayName: name });

    // Create student profile record in Firestore
    await db.collection('students').doc(user.uid).set({
      uid: user.uid,
      name: name,
      email: email,
      course: course || '',
      role: 'Student',
      status: 'Active',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return user;
  }

  /**
   * Student / Admin Login
   */
  async function loginUser(email, password) {
    if (!initFirebase()) {
      throw new Error('Firebase credentials are not configured in firebase-config.js');
    }

    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch user profile from Firestore
    const userDoc = await db.collection('students').doc(user.uid).get();
    const profile = userDoc.exists ? userDoc.data() : { role: 'Student' };

    return { user, profile };
  }

  /**
   * Sign Out
   */
  async function logoutUser() {
    if (!initFirebase()) return;
    return await auth.signOut();
  }

  /**
   * Auth State Observer
   */
  function onAuthStateChanged(callback) {
    if (!initFirebase()) {
      callback(null);
      return () => {};
    }
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await db.collection('students').doc(user.uid).get();
          const profile = userDoc.exists ? userDoc.data() : null;
          callback({ user, profile });
        } catch (e) {
          callback({ user, profile: null });
        }
      } else {
        callback(null);
      }
    });
  }

  // Expose methods on window.StatsFirebase
  window.StatsFirebase = {
    saveContactInquiry,
    saveInternshipApplication,
    saveCourseInquiry,
    registerStudent,
    loginUser,
    logoutUser,
    onAuthStateChanged
  };

  // Try auto-init on load
  window.addEventListener('DOMContentLoaded', () => {
    initFirebase();
  });
})();
