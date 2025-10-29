# Security Considerations

## Implemented Security Measures

1. **Google OAuth Authentication**: All protected endpoints require valid Google ID tokens
2. **Role-Based Authorization**: Email allowlists enforce Seedbringer and Council roles
3. **Token Verification**: Server-side verification of Google ID tokens via google-auth-library
4. **Environment Variables**: Sensitive configuration stored in environment variables, not in code
5. **CORS**: Cross-Origin Resource Sharing configured for API access
6. **Input Validation**: Token payload validation with null checks

## Known Limitations & Recommendations for Production

### Rate Limiting (IMPORTANT)
**Status**: Not implemented in this minimal implementation  
**Risk**: Routes performing authorization are vulnerable to denial-of-service attacks  
**Recommendation**: Before deploying to production, add rate limiting middleware

#### Recommended Implementation:
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/sfi', limiter);
app.use('/mcl/live', limiter);
app.use('/allocations', limiter);
```

### Additional Production Considerations

1. **HTTPS Only**: Ensure all traffic is over HTTPS in production
2. **Token Expiry**: Implement token refresh logic on the client side
3. **Logging**: Add comprehensive logging for security events
4. **Monitoring**: Set up monitoring for suspicious authentication patterns
5. **Helmet.js**: Consider adding helmet.js for additional security headers
6. **Input Sanitization**: Add validation for request bodies on POST endpoints

## Deployment Checklist

- [ ] Add rate limiting middleware
- [ ] Enable HTTPS
- [ ] Review and update allowlists in production .env
- [ ] Set up monitoring and alerting
- [ ] Configure proper CORS origins for production
- [ ] Implement request logging
- [ ] Set up error tracking (e.g., Sentry)
