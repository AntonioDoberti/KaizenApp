import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { UNITS } from '@components/add-habit/GoalSelector';
import { getHabitCompletion, updateHabitCompletion } from '@services/dailyCompletionsService';
import HabitProgressSelector from '@components/habit-progress/HabitProgressSelector';

type Props = {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    goalTarget: number;
    goalUnit: string;
    goalType?: string;
    date?: string;
    onPress?: () => void;
};

export default function HabitCard({ 
    id,
    title, 
    description, 
    icon, 
    color, 
    goalTarget, 
    goalUnit,
    goalType,
    date,
    onPress 
}: Props) {
    const unitData = UNITS.find(unit => unit.id === goalUnit);
    const [completed, setCompleted] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const determineGoalType = () => {
        if (goalType) return goalType;
        
        if (goalTarget === 1) {
            return 'Check';
        } else if (goalTarget >= 2 && goalTarget <= 5) {
            return 'Sum';
        } else {
            return 'Slide';
        }
    };
    
    const habitGoalType = determineGoalType();
    
    useEffect(() => {
        const loadCompletion = async () => {
            try {
                const completionData = await getHabitCompletion(id, date);
                if (completionData) {
                    setCompleted(completionData.progress);
                } else {
                    setCompleted(0);
                }
            } catch (error) {
                console.error('Error loading habit completion:', error);
                setCompleted(0);
            } finally {
                setLoading(false);
            }
        };
        
        loadCompletion();
    }, [id, date]);
    
    const handleProgressChange = async (newProgress: number) => {
        try {
            setCompleted(newProgress);
            await updateHabitCompletion(id, newProgress, date);
        } catch (error) {
            console.error('Error updating habit completion:', error);
            const completionData = await getHabitCompletion(id, date);
            if (completionData) {
                setCompleted(completionData.progress);
            }
        }
    };
    
    const goalValueNum = goalTarget || 1;
    const progress = Math.min(100, Math.max(0, (completed / goalValueNum) * 100));
    const isDone = completed >= goalValueNum;

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <FontAwesome5 name={icon as any} size={22} color="#fff" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description} numberOfLines={1}>{description}</Text>
                </View>
                
                {habitGoalType === 'Check' ? (
                    <View style={styles.checkContainer}>
                        <HabitProgressSelector
                            id={id}
                            goalType={habitGoalType}
                            progress={completed}
                            goalTarget={goalTarget}
                            color={"#5D7AF8"}
                            onProgressChange={handleProgressChange}
                            isCompact={true}
                        />
                    </View>
                ) : habitGoalType === 'Sum' ? (
                    <View style={styles.sumContainer}>
                        <HabitProgressSelector
                            id={id}
                            goalType={habitGoalType}
                            progress={completed}
                            goalTarget={goalTarget}
                            color={"#5D7AF8"}
                            onProgressChange={handleProgressChange}
                            isCompact={true}
                        />
                    </View>
                ) : (
                    <View style={styles.progressContainer}>
                        <HabitProgressSelector
                            id={id}
                            goalType={habitGoalType}
                            progress={completed}
                            goalTarget={goalTarget}
                            color={"#5D7AF8"}
                            onProgressChange={handleProgressChange}
                            isCompact={true}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    textContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    progressContainer: {
        marginTop: 4,
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 'auto',
        paddingLeft: 8,
    },
    sumContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 'auto',
        paddingLeft: 8,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    completedProgress: {
        backgroundColor: '#4CAF50',
    }
});
