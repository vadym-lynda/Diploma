import React, { useState, useEffect } from 'react';

export function checkUserRole(role) {
  try {
    if (!role) {
      throw new Error('Користувач не знайдений');
    }

    if (role === 'ROLE_ADMIN') {
      return true;
    } 

    return false;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

export function deleteToken() {
  try {
    localStorage.removeItem('userToken');
    console.log('Токен успішно видалено');
  } catch (error) {
    console.error('Помилка видалення токена:', error);
  }
}


