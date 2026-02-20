import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComplaintContext } from '../App';

export default function StudentDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const categories = ['Water', 'Electricity', 'Furniture', 'Cleanliness', 'Other'];

  const addComplaint = () => {
    if (!description.trim()) {
      Alert.alert('Oops', 'Please describe the issue first.');
      return;
    }

    const newComplaint = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 10),
      category,
      description: description.trim(),
      status: 'Pending',
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    setDescription('');
    Alert.alert('Success', 'Your complaint has been submitted!');
  };

  const deleteComplaint = (id) => {
    const handleDeletion = () => {
      setComplaints((prev) => prev.filter((c) => c.id !== id));
      if (Platform.OS === 'web') {
        alert('Complaint removed successfully.');
      } else {
        Alert.alert('Deleted', 'Complaint removed successfully.');
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this complaint? This cannot be undone.')) {
        handleDeletion();
      }
    } else {
      Alert.alert(
        'Delete Complaint',
        'Are you sure you want to delete this complaint? This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: handleDeletion,
          },
        ]
      );
    }
  };

  const viewComplaint = (complaint) => {
    setSelectedComplaint({ ...complaint });
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (!selectedComplaint?.description?.trim()) {
      Alert.alert('Error', 'Description cannot be empty.');
      return;
    }

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id ? { ...selectedComplaint } : c
      )
    );

    setModalVisible(false);
    setSelectedComplaint(null);
    Alert.alert('Updated', 'Your changes have been saved.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerWrapper}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={28} color="#1E293B" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Report an Issue</Text>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <TextInput
            placeholder="Describe the problem in detail..."
            value={description}
            onChangeText={setDescription}
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholderTextColor="#94A3B8"
          />

          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  category === cat && styles.selectedCategory,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && { color: '#FFFFFF' },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={addComplaint}
            activeOpacity={0.85}
          >
            <Icon name="send" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.btnText}>Submit Complaint</Text>
          </TouchableOpacity>
        </View>

        {/* Complaints List Header */}
        <Text style={[styles.header, { marginTop: 36, marginBottom: 16 }]}>
          My Reported Issues
        </Text>

        {complaints.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="report-problem" size={60} color="#94A3B8" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyText}>
              No issues reported yet.{'\n'}Use the form above to submit one!
            </Text>
          </View>
        ) : (
          <FlatList
            data={complaints}
            keyExtractor={(item) => item.id}
            extraData={complaints} // Forces re-render when complaints change
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.complaintCard}>
                <View style={styles.cardHeader}>
                  <Icon name="category" size={22} color="#26A69A" style={{ marginRight: 12 }} />
                  <Text style={styles.title}>{item.category} Issue</Text>
                </View>

                <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                  {item.description}
                </Text>

                <View style={styles.statusRow}>
                  <Icon name="schedule" size={16} color="#64748B" />
                  <Text style={styles.status}>Status: {item.status}</Text>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => viewComplaint(item)}
                  >
                    <Icon name="visibility" size={18} color="#FFFFFF" />
                    <Text style={styles.smallBtnText}>View / Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteComplaint(item.id)}
                  >
                    <Icon name="delete-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.smallBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Your Issue</Text>

            {selectedComplaint && (
              <>
                <TextInput
                  style={styles.modalInput}
                  value={selectedComplaint.description}
                  onChangeText={(text) =>
                    setSelectedComplaint({ ...selectedComplaint, description: text })
                  }
                  multiline
                  numberOfLines={5}
                  placeholderTextColor="#94A3B8"
                />

                <View style={styles.categoryContainer}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryBtn,
                        selectedComplaint.category === cat && styles.selectedCategory,
                      ]}
                      onPress={() =>
                        setSelectedComplaint({ ...selectedComplaint, category: cat })
                      }
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          selectedComplaint.category === cat && { color: '#FFFFFF' },
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={saveEdit}
                  activeOpacity={0.85}
                >
                  <Icon name="save" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
                  <Text style={styles.btnText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedComplaint(null);
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  innerWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  backText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },

  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  textArea: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    minHeight: 110,
    textAlignVertical: 'top',
    marginBottom: 20,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  categoryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    minWidth: 90,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#26A69A',
  },
  categoryText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#475569',
  },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    borderRadius: 18,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  listContent: {
    paddingBottom: 60,
  },

  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17.5,
    fontWeight: '700',
    color: '#1E293B',
  },

  description: {
    fontSize: 15.5,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  status: {
    fontSize: 14.5,
    color: '#64748B',
    marginLeft: 8,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 12,
    borderRadius: 14,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5350',
    paddingVertical: 12,
    borderRadius: 14,
  },
  smallBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  modalHeader: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
  },

  cancelBtn: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
  },
  cancelText: {
    color: '#475569',
    fontSize: 16.5,
    fontWeight: '600',
  },
});