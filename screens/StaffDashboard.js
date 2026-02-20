import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComplaintContext } from '../App';

export default function StaffDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);

  const assignedTasks = complaints.filter((c) => c.assignedTo);

  const markCompleted = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: 'Completed' } : c
    );
    setComplaints(updated);
    Alert.alert('Success', 'Task marked as completed!');
  };

  return (
    <View style={styles.container}>
      {/* Back Button*/}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={28} color="#1E293B" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Your Assigned Tasks</Text>

      {assignedTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="assignment-late" size={64} color="#94A3B8" style={{ marginBottom: 16 }} />
          <Text style={styles.emptyText}>
            No tasks assigned to you yet.{'\n'}
            Check back later or contact admin.
          </Text>
        </View>
      ) : (
        <FlatList
          data={assignedTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.cardHeader}>
                <Icon name="build" size={26} color="#26A69A" style={styles.headerIcon} />
                <Text style={styles.taskTitle}>{item.category} Issue</Text>
              </View>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <Icon name="person" size={18} color="#64748B" />
                  <Text style={styles.metaText}>Assigned to: {item.assignedTo}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Icon name="schedule" size={18} color="#64748B" />
                  <Text style={styles.metaText}>Status: {item.status}</Text>
                </View>
              </View>

              {item.status !== 'Completed' ? (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => markCompleted(item.id)}
                  activeOpacity={0.85}
                >
                  <Icon name="check-circle-outline" size={22} color="#FFFFFF" style={{ marginRight: 10 }} />
                  <Text style={styles.buttonText}>Mark as Completed</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.completedContainer}>
                  <Icon name="check-circle" size={24} color="#26A69A" />
                  <Text style={styles.completedText}>Task Completed ✓</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
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
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
  },

  listContent: {
    paddingBottom: 40,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    marginRight: 14,
  },
  taskTitle: {
    fontSize: 18,
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

  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26A69A',
    marginLeft: 10,
  },
});