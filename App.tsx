import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';

// Remove direct image import
// Instead, we'll use require directly in the component

export function App() {
  const [joke, setJoke] = useState({ pun: '', punchline: '' });
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/AlexLakatos/computer-puns/main/puns.json');
      if (response.ok) {
        const puns = await response.json();
        const randomPun = Math.floor(Math.random() * puns.length);
        setJoke(puns[randomPun]);
        setError('');
      } else {
        setError('Failed to fetch joke');
        setJoke({ pun: '', punchline: '' });
      }
    } catch (error) {
      setError('Error loading joke');
      setJoke({ pun: '', punchline: '' });
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.jokeContainer}>
        <Text style={styles.title}>Random Coder Jokes</Text>
        <Image 
          source={require('./public/coder.jpg')}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="Coder illustration"
        />
        <Text style={styles.pun}>{error || joke.pun}</Text>
        <Text style={styles.punchline}>{joke.punchline}</Text>
        <Pressable 
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={fetchJoke}
        >
          <Text style={styles.buttonText}>Get New Joke</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  jokeContainer: {
    ...Platform.select({
      web: {
        maxWidth: 600,
        marginHorizontal: 'auto',
      },
      default: {
        width: '100%',
        marginHorizontal: 0,
      },
    }),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pun: {
    fontSize: 24,
    color: '#e74c3c',
    marginVertical: 20,
    textAlign: 'center',
  },
  punchline: {
    fontSize: 20,
    color: '#27ae60',
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonPressed: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
