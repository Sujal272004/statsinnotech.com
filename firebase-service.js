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

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    const userCredential = await auth.createUserWithEmailAndPassword(cleanEmail, password);
    const user = userCredential.user;

    // Update Auth Profile Display Name
    try {
      await user.updateProfile({ displayName: cleanName });
    } catch (e) {
      console.warn('Could not update displayName:', e);
    }

    // Create student profile record in Firestore (with resilient fallback if rules are locked)
    try {
      if (db) {
        await db.collection('students').doc(user.uid).set({
          uid: user.uid,
          name: cleanName,
          email: cleanEmail,
          course: course || 'Engineering Track',
          role: 'Student',
          status: 'Active',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (firestoreErr) {
      console.warn('Firestore student profile write skipped (check Firestore security rules):', firestoreErr);
    }

    return user;
  }

  /**
   * Student / Admin Login
   */
  async function loginUser(email, password) {
    if (!initFirebase()) {
      throw new Error('Firebase credentials are not configured in firebase-config.js');
    }

    const cleanEmail = (email || '').trim().toLowerCase();

    const userCredential = await auth.signInWithEmailAndPassword(cleanEmail, password);
    const user = userCredential.user;

    // Fetch user profile from Firestore with resilient fallback
    let profile = {
      role: 'Student',
      name: user.displayName || cleanEmail.split('@')[0],
      email: cleanEmail,
      course: 'Engineering Track'
    };

    try {
      if (db) {
        const userDoc = await db.collection('students').doc(user.uid).get();
        if (userDoc && userDoc.exists) {
          profile = { ...profile, ...userDoc.data() };
        }
      }
    } catch (firestoreErr) {
      console.warn('Firestore profile read skipped (using Auth credentials):', firestoreErr);
    }

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

  /**
   * Send Password Reset Email
   */
  async function resetPassword(email) {
    if (!initFirebase()) throw new Error('Firebase credentials are not configured.');
    const cleanEmail = (email || '').trim().toLowerCase();
    return await auth.sendPasswordResetEmail(cleanEmail);
  }

  // Expose methods on window.StatsFirebase
  window.StatsFirebase = {
    saveContactInquiry,
    saveInternshipApplication,
    saveCourseInquiry,
    registerStudent,
    loginUser,
    logoutUser,
    resetPassword,
    onAuthStateChanged
  };

  // Try auto-init on load
  window.addEventListener('DOMContentLoaded', () => {
    initFirebase();
  });
})();
