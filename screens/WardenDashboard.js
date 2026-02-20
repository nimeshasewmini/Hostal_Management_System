import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComplaintContext } from '../App';

export default function WardenDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [staffName, setStaffName] = useState('');

  const openAssignModal = (id) => {
    setSelectedComplaintId(id);
    setStaffName('');
    setModalVisible(true);
  };

  const handleAssign = () => {
    if (!staffName.trim()) {
      Alert.alert('Error', 'Please enter a staff name');
      return;
    }

    const updated = complaints.map((c) =>
      c.id === selectedComplaintId
        ? { ...c, assignedTo: staffName.trim(), status: 'Assigned' }
        : c
    );

    setComplaints(updated);
    setModalVisible(false);
    setSelectedComplaintId(null);
    setStaffName('');

    Alert.alert('Success', `Assigned to ${staffName.trim()}`, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Staff');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={28} color="#1E293B" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Pending Complaints</Text>

      {complaints.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon
            name="inbox"
            size={72}
            color="#94A3B8"
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.emptyText}>
            No complaints received yet.{'\n'}
            New reports from students will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.complaintCard}>
              <View style={styles.cardHeader}>
                <Icon
                  name="report-problem"
                  size={26}
                  color="#26A69A"
                  style={styles.headerIcon}
                />
                <Text style={styles.title}>{item.category} Issue</Text>
              </View>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <Icon name="schedule" size={18} color="#64748B" />
                  <Text style={styles.metaText}>Status: {item.status}</Text>
                </View>
                {item.assignedTo && (
                  <View style={styles.metaRow}>
                    <Icon name="person" size={18} color="#64748B" />
                    <Text style={styles.metaText}>
                      Assigned to: {item.assignedTo}
                    </Text>
                  </View>
                )}
              </View>

              {item.status === 'Pending' && (
                <TouchableOpacity
                  style={styles.assignButton}
                  onPress={() => openAssignModal(item.id)}
                  activeOpacity={0.85}
                >
                  <Icon
                    name="person-add"
                    size={20}
                    color="#FFFFFF"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.buttonText}>Assign to Staff</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}

      {/* Assign Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Assign to Staff</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter staff name (e.g. Mr. Kamal)"
              value={staffName}
              onChangeText={setStaffName}
              placeholderTextColor="#94A3B8"
              autoFocus
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelModalBtn}
                onPress={() => {
                  setModalVisible(false);
                  setStaffName('');
                }}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.assignModalBtn}
                onPress={handleAssign}
              >
                <Icon
                  name="person-add"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.assignModalText}>Assign Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 36,
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
    marginBottom: 32,
    letterSpacing: 0.3,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
  },

  listContent: {
    paddingBottom: 60,
  },

  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    marginRight: 14,
  },
  title: {
    fontSize: 18.5,
    fontWeight: '700',
    color: '#1E293B',
  },

  description: {
    fontSize: 15.5,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 20,
  },

  metaContainer: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 14.5,
    color: '#64748B',
    marginLeft: 8,
  },

  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    borderRadius: 18,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Modal
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
    fontSize: 16.5,
    color: '#1E293B',
    marginBottom: 28,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  cancelModalBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  cancelModalText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
  assignModalBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  assignModalText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});