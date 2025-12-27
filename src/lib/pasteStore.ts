// Supabase-based paste store for online sharing
import { supabase } from "../integrations/supabase/client";

// Generate a random 6-character alphanumeric code
export const generateCode = (): string => {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Save paste via Supabase and return the code
export const savePaste = async (content: string): Promise<string> => {
  try {
    // Generate a unique code
    let code: string;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      code = generateCode();
      const { data, error } = await supabase
        .from('pastes')
        .select('code')
        .eq('code', code)
        .maybeSingle();
          
      if (error && error.code !== 'PGRST116') { // Only log error if it's not 'Row not found'
        console.error('Error checking code uniqueness:', error);
      }
          
      if (!data) { // If no data is returned, the code doesn't exist (is unique)
        isUnique = true;
      } else {
        attempts++;
      }
    }
    
    if (!isUnique) {
      throw new Error('Failed to generate unique code after multiple attempts');
    }

    const { error } = await supabase
      .from('pastes')
      .insert([{ code, content }]);

    if (error) {
      throw new Error(error.message || 'Failed to save paste');
    }

    return code;
  } catch (error) {
    console.error('Error saving paste:', error);
    throw error;
  }
};

// Get paste by code via Supabase
export const getPaste = async (code: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('pastes')
      .select('content')
      .eq('code', code)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116' || error.code === '406') { // Record not found or Not Acceptable
        return null;
      }
      throw new Error(error.message || 'Failed to retrieve paste');
    }
    
    return data?.content || null;
  } catch (error) {
    console.error('Error retrieving paste:', error);
    return null;
  }
};

// Check if paste exists via Supabase
export const pasteExists = async (code: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('pastes')
      .select('code')
      .eq('code', code)
      .maybeSingle();
    
    if (error) {
      if (error.code === 'PGRST116' || error.code === '406') { // Record not found or Not Acceptable
        return false;
      }
      throw new Error(error.message || 'Failed to check paste existence');
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking paste existence:', error);
    return false;
  }
};

// Generate shareable link
export const generateLink = (code: string): string => {
  return `${window.location.origin}/paste/${code}`;
};

// Delete paste via Supabase (optional)
export const deletePaste = async (code: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('pastes')
      .delete()
      .eq('code', code);
    
    if (error) {
      console.error('Error deleting paste:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting paste:', error);
    return false;
  }
};